import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeRegistry } from './routeRegistry';
import { updatePageMeta } from '../utils/seo';

/**
 * Finds route metadata by pathname and updates page meta tags
 *
 * @param pathname - Current route path
 * @returns The matching route definition or undefined
 */
export function updateMetaFromRegistry(pathname: string) {
  // Find matching route (exact match first, then wildcard)
  const route = routeRegistry.find((r) => {
    if (r.path === '*') return false; // Skip wildcard for now
    return r.path === pathname || r.redirectTo === pathname;
  });

  if (route) {
    updatePageMeta({
      title: route.title,
      description: route.description,
      path: route.path,
    });
  }

  return route;
}

/**
 * Hook that automatically updates page metadata from route registry
 * Call this in page components instead of manually calling updatePageMeta
 *
 * @example
 * ```tsx
 * export default function MyPage() {
 *   useRouteMetadata();
 *   return <div>Content</div>;
 * }
 * ```
 */
export function useRouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    updateMetaFromRegistry(location.pathname);
  }, [location.pathname]);
}
