import { Route, Navigate } from 'react-router-dom';
import type { RouteDef } from './routeRegistry';
import { RequireAuth } from '../auth/RequireAuth';

/**
 * Converts the route registry into React Router Route elements
 *
 * @param routes - Array of route definitions from routeRegistry
 * @returns Array of Route JSX elements ready to render
 *
 * Handles:
 * - Standard routes with elements
 * - Redirect/alias routes (using Navigate)
 * - Index routes (path === '/')
 */
export function renderRoutes(routes: RouteDef[]) {
  return routes.map((route) => {
    // Handle redirect/alias routes
    if (route.redirectTo) {
      return (
        <Route key={route.id} path={route.path} element={<Navigate to={route.redirectTo} replace />} />
      );
    }

    // Handle index route (home page)
    if (route.path === '/') {
      return <Route key={route.id} index element={route.element} />;
    }

    // Handle catch-all route (404)
    if (route.path === '*') {
      return <Route key={route.id} path="*" element={route.element} />;
    }

    // Standard route with element
    const element = route.auth?.required ? (
      <RequireAuth requiredRole={route.auth.role}>{route.element}</RequireAuth>
    ) : (
      route.element
    );

    return <Route key={route.id} path={route.path} element={element} />;
  });
}
