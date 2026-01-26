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
import ProgramFSIP from './pages/program-fsip';
import FSIPResourceHub from './pages/fsip-resource-hub';
import FSIPCrisisNavigation from './pages/fsip-crisis-navigation';
import FSIPFamilyRepair from './pages/fsip-family-repair';
import FSIPProviderNetwork from './pages/fsip-provider-network';
import Providers from './pages/providers';
import Portal from './pages/portal';
import SupportPortal from './pages/support-portal';
import PrivacyPolicy from './pages/privacy-policy';
import TermsOfService from './pages/terms-of-service';

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
          <Route index element={<Home />} />
          <Route path="who-we-serve" element={<WhoWeServe />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/mobility-stabilization" element={<ProgramMobilityStabilization />} />
          <Route path="programs/fsip" element={<ProgramFSIP />} />
          <Route path="fsip" element={<ProgramFSIP />} />
          <Route path="fsip/resource-hub" element={<FSIPResourceHub />} />
          <Route path="fsip/crisis-navigation" element={<FSIPCrisisNavigation />} />
          <Route path="fsip/family-repair" element={<FSIPFamilyRepair />} />
          <Route path="fsip/provider-network" element={<FSIPProviderNetwork />} />
          <Route path="providers" element={<Providers />} />
          <Route path="portal" element={<Portal />} />
          <Route path="support-portal" element={<SupportPortal />} />
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
