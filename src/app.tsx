import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { routeRegistry } from './routes/routeRegistry';
import { renderRoutes } from './routes/renderRoutes';

function RouteChangeTracker() {
  const location = useLocation();
  const pendingPagePathRef = useRef<string | null>(null);
  const lastSentPathRef = useRef<string | null>(null);

  useEffect(() => {
    const sendPageView = (pagePath: string) => {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
      
      // Avoid duplicate sends for the same path
      if (lastSentPathRef.current === pagePath) {
        if (import.meta.env.DEV) {
          console.log('[GA] skipped duplicate page_view ->', pagePath);
        }
        return;
      }

      if (!gtag) {
        pendingPagePathRef.current = pagePath;
        if (import.meta.env.DEV) {
          console.log('[GA] buffered ->', pagePath);
        }
        return;
      }

      // Send explicit page_view event with full context
      gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title
      });

      lastSentPathRef.current = pagePath;
      pendingPagePathRef.current = null;

      if (import.meta.env.DEV) {
        console.log('[GA] page_view sent ->', pagePath);
      }
    };

    const pagePath = `${location.pathname}${location.search}`;
    sendPageView(pagePath);

    // Flush pending page_view if gtag became available
    if (pendingPagePathRef.current && pendingPagePathRef.current !== pagePath) {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag && lastSentPathRef.current !== pendingPagePathRef.current) {
        gtag('event', 'page_view', {
          page_path: pendingPagePathRef.current,
          page_location: window.location.origin + pendingPagePathRef.current,
          page_title: document.title
        });
        lastSentPathRef.current = pendingPagePathRef.current;
        if (import.meta.env.DEV) {
          console.log('[GA] flushed ->', pendingPagePathRef.current);
        }
        pendingPagePathRef.current = null;
      }
    }
  }, [location.pathname, location.search]);

  // Dev-only: log when gtag becomes available and route status
  useEffect(() => {
    if (import.meta.env.DEV) {
      const checkGtag = setInterval(() => {
        const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          console.log('[GA] gtag loaded successfully');
          console.log('[GA] Current route:', location.pathname, '| gtag available:', !!gtag);
          clearInterval(checkGtag);
        }
      }, 500);

      return () => clearInterval(checkGtag);
    }
  }, []);

  return null;
}



export default function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Layout />}>
          {renderRoutes(routeRegistry)}
        </Route>
      </Routes>
    </Router>
  );
}
