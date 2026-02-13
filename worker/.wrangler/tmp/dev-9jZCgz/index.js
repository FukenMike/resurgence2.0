var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
var json = /* @__PURE__ */ __name((data, init = {}) => new Response(JSON.stringify(data), {
  ...init,
  headers: { "content-type": "application/json; charset=utf-8", ...init.headers || {} }
}), "json");
var now = /* @__PURE__ */ __name(() => Math.floor(Date.now() / 1e3), "now");
var uuid = /* @__PURE__ */ __name(() => crypto.randomUUID(), "uuid");
function cors(env, req) {
  const origin = req.headers.get("Origin") || "";
  const allow = origin === env.APP_ORIGIN ? origin : env.APP_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Vary": "Origin"
  };
}
__name(cors, "cors");
function getCookie(req, name) {
  const c = req.headers.get("Cookie") || "";
  const parts = c.split(";").map((p) => p.trim());
  for (const p of parts) {
    if (p.startsWith(name + "=")) return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}
__name(getCookie, "getCookie");
function setSessionCookie(id, reqUrl) {
  const secure = reqUrl.protocol === "https:" ? "; Secure" : "";
  return `tfa_session=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 14}${secure}`;
}
__name(setSessionCookie, "setSessionCookie");
function clearSessionCookie(reqUrl) {
  const secure = reqUrl.protocol === "https:" ? "; Secure" : "";
  return `tfa_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}
__name(clearSessionCookie, "clearSessionCookie");
function toB64(bytes) {
  let s = "";
  bytes.forEach((b) => s += String.fromCharCode(b));
  return btoa(s).replaceAll("=", "");
}
__name(toB64, "toB64");
function fromB64(b64) {
  const pad = "=".repeat((4 - b64.length % 4) % 4);
  const bin = atob(b64 + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
__name(fromB64, "fromB64");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
async function hashPassword(password) {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 2e5, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const hash = new Uint8Array(bits);
  return `pbkdf2$200000$${toB64(salt)}$${toB64(hash)}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, stored) {
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
__name(verifyPassword, "verifyPassword");
async function handleRegister(env, req) {
  const url = new URL(req.url);
  const body = await req.json().catch(() => null);
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
__name(handleRegister, "handleRegister");
async function handleLogin(env, req) {
  const url = new URL(req.url);
  const body = await req.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");
  if (!email || !password) return json({ error: "Invalid credentials" }, { status: 400 });
  const row = await env.DB.prepare("SELECT id, email, password_hash, role FROM users WHERE email = ?").bind(email).first();
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
__name(handleLogin, "handleLogin");
async function handleLogout(env, req) {
  const url = new URL(req.url);
  const sid = getCookie(req, "tfa_session");
  if (sid) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sid).run();
  return json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie(url) } });
}
__name(handleLogout, "handleLogout");
async function handleMe(env, req) {
  const url = new URL(req.url);
  const sid = getCookie(req, "tfa_session");
  if (!sid) return json({ user: null });
  const t = now();
  const row = await env.DB.prepare(`
    SELECT u.id, u.email, u.role
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ? AND s.expires_at > ?
  `).bind(sid, t).first();
  if (!row) return json({ user: null }, { headers: { "Set-Cookie": clearSessionCookie(url) } });
  return json({ user: row });
}
__name(handleMe, "handleMe");
var src_default = {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: cors(env, req) });
    }
    let res;
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
  }
};

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-QUXqaI/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-QUXqaI/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
