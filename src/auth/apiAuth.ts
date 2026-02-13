export type UserRole = 'family' | 'provider' | 'admin';

export interface AuthedUser {
  id: string;
  email: string;
  role: UserRole;
}

export async function apiMe(): Promise<AuthedUser | null> {
  const res = await fetch('/api/me', { credentials: 'include' });
  if (!res.ok) return null;
  const data = (await res.json()) as { user: AuthedUser | null };
  return data.user ?? null;
}

export async function apiRegister(email: string, password: string): Promise<AuthedUser> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.error || 'Registration failed');
  return (data as any).user as AuthedUser;
}

export async function apiLogin(email: string, password: string): Promise<AuthedUser> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.error || 'Login failed');
  return (data as any).user as AuthedUser;
}

export async function apiLogout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
}
