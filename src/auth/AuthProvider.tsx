import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthedUser, UserRole } from './apiAuth';
import { apiLogin, apiLogout, apiMe, apiRegister } from './apiAuth';

type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'anon'; user: null }
  | { status: 'authed'; user: AuthedUser };

interface AuthContextValue {
  state: AuthState;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role?: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading', user: null });

  const refresh = async () => {
    setState({ status: 'loading', user: null });
    const me = await apiMe();
    if (me) setState({ status: 'authed', user: me });
    else setState({ status: 'anon', user: null });
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    await apiLogin(email, password);
    await refresh();
  };

  const register = async (email: string, password: string) => {
    await apiRegister(email, password);
    await refresh();
  };

  const logout = async () => {
    await apiLogout();
    setState({ status: 'anon', user: null });
  };

  const hasRole = (role?: UserRole) => {
    if (!role) return state.status === 'authed';
    return state.status === 'authed' && state.user.role === role;
  };

  const value = useMemo<AuthContextValue>(
    () => ({ state, refresh, login, register, logout, hasRole }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
