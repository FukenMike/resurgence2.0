import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import WhoWeServe from './pages/who-we-serve';
import Programs from './pages/programs';
import HowWeHelp from './pages/how-we-help';
import About from './pages/about';
import ResourcesTools from './pages/resources-tools';
import { ResourcesDirectory } from './pages/resources-directory';
import GetInvolved from './pages/get-involved';
import Transparency from './pages/transparency';
import NotFound from './pages/not-found';
import ProgramMobilityStabilization from './pages/program-mobility-stabilization';
import PrivacyPolicy from './pages/privacy-policy';
import TermsOfService from './pages/terms-of-service';

function RouteChangeTracker() {
  const location = useLocation();
  const pendingPagePathRef = useRef<string | null>(null);

  useEffect(() => {
    const sendPageView = (pathname: string) => {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (!gtag) {
        pendingPagePathRef.current = pathname;
        if (import.meta.env.DEV) {
          console.log('[GA] gtag not yet available; buffered page_path:', pathname);
        }
        return;
      }

      gtag('config', 'G-622ZKH6HC1', { page_path: pathname });
      if (import.meta.env.DEV) {
        console.log('[GA] pageview ->', pathname);
      }
      pendingPagePathRef.current = null;
    };

    const pagePath = `${location.pathname}${location.search}`;
    sendPageView(pagePath);

    // If there was a pending page_path and gtag is now available, send it
    if (pendingPagePathRef.current && pendingPagePathRef.current !== pagePath) {
      const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('config', 'G-622ZKH6HC1', { page_path: pendingPagePathRef.current });
        if (import.meta.env.DEV) {
          console.log('[GA] flushed pending pageview ->', pendingPagePathRef.current);
        }
        pendingPagePathRef.current = null;
      }
    }
  }, [location.pathname, location.search]);

  // Dev-only: log when gtag becomes available
  useEffect(() => {
    if (import.meta.env.DEV) {
      const checkGtag = setInterval(() => {
        const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          console.log('[GA] gtag loaded successfully');
          clearInterval(checkGtag);
        }
      }, 500);

      return () => clearInterval(checkGtag);
    }
  }, []);

  return null;
}

function LegacyURLRedirects() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // Redirect legacy URLs
    if (pathname === '/vision.html' || pathname === '/vision') {
      if (import.meta.env.DEV) {
        console.log('[GA] Legacy URL detected and redirected:', pathname, '-> /about');
      }
      window.location.replace('/about');
    } else if (pathname === '/wall-of-truth') {
      if (import.meta.env.DEV) {
        console.log('[GA] Legacy URL detected and redirected:', pathname, '-> /transparency');
      }
      window.location.replace('/transparency');
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <LegacyURLRedirects />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="who-we-serve" element={<WhoWeServe />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/mobility-stabilization" element={<ProgramMobilityStabilization />} />
          <Route path="how-we-help" element={<HowWeHelp />} />
          <Route path="about" element={<About />} />
          {/* /resources restored to original tools layout; directory lives under /resources/directory */}
          <Route path="resources" element={<ResourcesTools />} />
          <Route path="resources/directory" element={<ResourcesDirectory />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="transparency" element={<Transparency />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
