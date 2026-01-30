/**
 * Minimal authentication utilities
 * Uses localStorage for session persistence in demo mode
 * 
 * TODO: Replace with actual authentication provider (OAuth, JWT, etc.)
 */

export type UserRole = 'family' | 'provider' | 'admin';

interface Session {
  role: UserRole;
  timestamp: string;
}

const SESSION_KEY = 'tfa_demo_session';

/**
 * Get the current session from localStorage
 */
export function getSession(): Session | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as Session;
  } catch (e) {
    console.error('Failed to parse session from localStorage', e);
    return null;
  }
}

/**
 * Set a new session with the specified role
 */
export function setSession(role: UserRole): void {
  const session: Session = {
    role,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Clear the current session (logout)
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Check if the user is authenticated
 * Optionally check if they have a specific role
 */
export function isAuthed(requiredRole?: UserRole): boolean {
  const session = getSession();
  if (!session) return false;
  if (!requiredRole) return true;
  return session.role === requiredRole;
}
