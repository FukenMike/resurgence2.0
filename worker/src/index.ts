export interface Env {
  DB: D1Database;
  APP_ORIGIN: string;
}

const json = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json; charset=utf-8", ...(init.headers || {}) },
  });

const now = () => Math.floor(Date.now() / 1000);
const uuid = () => crypto.randomUUID();

function cors(env: Env, req: Request): HeadersInit {
  const origin = req.headers.get("Origin") || "";
  const allow = origin === env.APP_ORIGIN ? origin : env.APP_ORIGIN;

  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Vary": "Origin",
  };
}

function getCookie(req: Request, name: string): string | null {
  const c = req.headers.get("Cookie") || "";
  const parts = c.split(";").map((p) => p.trim());
  for (const p of parts) {
    if (p.startsWith(name + "=")) return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}

function setSessionCookie(id: string, reqUrl: URL): string {
  const secure = reqUrl.protocol === "https:" ? "; Secure" : "";
  return `tfa_session=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}${secure}`;
}

function clearSessionCookie(reqUrl: URL): string {
  const secure = reqUrl.protocol === "https:" ? "; Secure" : "";
  return `tfa_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

// ---------- Password hashing (PBKDF2 via WebCrypto) ----------
function toB64(bytes: Uint8Array): string {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replaceAll("=", "");
}
function fromB64(b64: string): Uint8Array {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(b64 + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 200_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const hash = new Uint8Array(bits);
  return `pbkdf2$200000$${toB64(salt)}$${toB64(hash)}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [alg, iterStr, saltB64, hashB64] = stored.split("$");
  if (alg !== "pbkdf2") return false;

  const iterations = Number(iterStr);
  const salt = fromB64(saltB64);
  const expected = fromB64(hashB64);

  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const actual = new Uint8Array(bits);
  return timingSafeEqual(actual, expected);
}

// ---------- Handlers ----------
async function handleRegister(env: Env, req: Request) {
  const url = new URL(req.url);
  const body = (await req.json().catch(() => null)) as any;

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || password.length < 8) return json({ error: "Invalid email/password" }, { status: 400 });

  const id = uuid();
  const pwHash = await hashPassword(password);
  const createdAt = now();

  try {
    await env.DB.prepare(
      "INSERT INTO users (id, email, password_hash, role, created_at) VALUES (?, ?, ?, 'family', ?)"
    ).bind(id, email, pwHash, createdAt).run();
  } catch {
    return json({ error: "Email already in use" }, { status: 409 });
  }

  // auto-login after register
  const sessionId = uuid();
  const expiresAt = createdAt + 60 * 60 * 24 * 14;
  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(sessionId, id, expiresAt, createdAt).run();

  return json(
    { ok: true, user: { id, email, role: "family" } },
    { headers: { "Set-Cookie": setSessionCookie(sessionId, url) } }
  );
}

async function handleLogin(env: Env, req: Request) {
  const url = new URL(req.url);
  const body = (await req.json().catch(() => null)) as any;

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  if (!email || !password) return json({ error: "Invalid credentials" }, { status: 400 });

  const row = (await env.DB.prepare("SELECT id, email, password_hash, role FROM users WHERE email = ?")
    .bind(email).first()) as any;

  if (!row) return json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) return json({ error: "Invalid credentials" }, { status: 401 });

  const sessionId = uuid();
  const createdAt = now();
  const expiresAt = createdAt + 60 * 60 * 24 * 14;

  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)"
  ).bind(sessionId, row.id, expiresAt, createdAt).run();

  return json(
    { ok: true, user: { id: row.id, email: row.email, role: row.role } },
    { headers: { "Set-Cookie": setSessionCookie(sessionId, url) } }
  );
}

async function handleLogout(env: Env, req: Request) {
  const url = new URL(req.url);
  const sid = getCookie(req, "tfa_session");
  if (sid) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sid).run();
  return json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie(url) } });
}

async function handleMe(env: Env, req: Request) {
  const url = new URL(req.url);
  const sid = getCookie(req, "tfa_session");
  if (!sid) return json({ user: null });

  const t = now();
  const row = (await env.DB.prepare(`
    SELECT u.id, u.email, u.role
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ? AND s.expires_at > ?
  `).bind(sid, t).first()) as any;

  if (!row) return json({ user: null }, { headers: { "Set-Cookie": clearSessionCookie(url) } });
  return json({ user: row });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: cors(env, req) });
    }

    let res: Response;

    try {
      if (req.method === "POST" && url.pathname === "/api/auth/register") res = await handleRegister(env, req);
      else if (req.method === "POST" && url.pathname === "/api/auth/login") res = await handleLogin(env, req);
      else if (req.method === "POST" && url.pathname === "/api/auth/logout") res = await handleLogout(env, req);

      else if (req.method === "GET" && url.pathname === "/api/me") res = await handleMe(env, req);

      else res = json({ error: "Not found" }, { status: 404 });

    } catch {

      res = json({ error: "Server error" }, { status: 500 });

    }



    const headers = new Headers(res.headers);

    const c = cors(env, req);

    for (const [k, v] of Object.entries(c)) headers.set(k, String(v));

    return new Response(res.body, { status: res.status, headers });

  },

};

