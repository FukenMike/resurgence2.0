import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../pages/home';
import WhoWeServe from '../pages/who-we-serve';
import Programs from '../pages/programs';
import HowWeHelp from '../pages/how-we-help';
import About from '../pages/about';
import ResourcesTools from '../pages/resources-tools';
import { ResourcesDirectory } from '../pages/resources-directory';
import ResourceDetail from '../pages/resource-detail';
import GetInvolved from '../pages/get-involved';
import Transparency from '../pages/transparency';
import NotFound from '../pages/not-found';
import ProgramMobilityStabilization from '../pages/program-mobility-stabilization';
import ProgramFSIP from '../pages/program-fsip';
import FSIPResourceHub from '../pages/fsip-resource-hub';
import FSIPCrisisNavigation from '../pages/fsip-crisis-navigation';
import FSIPFamilyRepair from '../pages/fsip-family-repair';
import FSIPProviderNetwork from '../pages/fsip-provider-network';
import Providers from '../pages/providers';
import FamilyPortal from '../pages/family-portal';
import Portals from '../pages/portals';
import ProviderPortal from '../pages/provider-portal';
import PrivacyPolicy from '../pages/privacy-policy';
import TermsOfService from '../pages/terms-of-service';
import Login from '../pages/login';

/**
 * Route navigation configuration
 */
export interface RouteNav {
  /** Show in header navigation */
  header: boolean;
  /** Show in mobile navigation */
  mobile: boolean;
  /** Show in footer navigation */
  footer: boolean;
  /** Display label for navigation */
  label: string;
  /** Sort order (lower numbers appear first) */
  order: number;
  /** Highlight with accent styling (e.g., CTA button) */
  highlight?: boolean;
}

/**
 * Route authentication requirements
 */
export interface RouteAuth {
  /** Whether authentication is required */
  required: boolean;
  /** Required role (optional) */
  role?: 'admin' | 'provider' | 'family';
}

/**
 * Complete route definition with metadata and navigation config
 */
export interface RouteDef {
  /** Unique route identifier */
  id: string;
  /** URL path */
  path: string;
  /** Page component (omit if redirectTo is set) */
  element?: ReactElement;
  /** Redirect target (if this is an alias route) */
  redirectTo?: string;
  /** Page title (for SEO and breadcrumbs) */
  title: string;
  /** Page description (for SEO) */
  description: string;
  /** Logical grouping */
  group: 'core' | 'programs' | 'fsip' | 'resources' | 'portals' | 'legal' | 'system';
  /** Navigation visibility and configuration */
  nav: RouteNav;
  /** Authentication requirements (optional) */
  auth?: RouteAuth;
  /** Route status: 'live' (published), 'draft' (in progress), 'archived' (deprecated) */
  status?: 'live' | 'draft' | 'archived';
}

/**
 * Central registry of all application routes
 */
export const routeRegistry: RouteDef[] = [
  // Core Pages
  {
    id: 'home',
    path: '/',
    element: <Home />,
    title: "The Father's Alliance",
    description: 'Stability support that keeps families moving forward.',
    group: 'core',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'Home',
      order: 1,
    },
  },
  {
    id: 'who-we-serve',
    path: '/who-we-serve',
    element: <WhoWeServe />,
    title: 'Who We Serve',
    description: 'Serving households under real world pressure.',
    group: 'core',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'Who We Serve',
      order: 2,
    },
  },
  {
    id: 'how-we-help',
    path: '/how-we-help',
    element: <HowWeHelp />,
    title: 'How We Help',
    description: 'Our approach to stability support and family assistance.',
    group: 'core',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'How We Help',
      order: 4,
    },
  },
  {
    id: 'about',
    path: '/about',
    element: <About />,
    title: 'About',
    description: 'Our mission, vision, and values.',
    group: 'core',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'About',
      order: 5,
    },
  },

  // Programs
  {
    id: 'programs',
    path: '/programs',
    element: <Programs />,
    title: 'Our Programs',
    description: 'Stability programs and pilots addressing household pressure points.',
    group: 'programs',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'Our Programs',
      order: 3,
    },
  },
  {
    id: 'program-mobility-stabilization',
    path: '/programs/mobility-stabilization',
    element: <ProgramMobilityStabilization />,
    title: 'Mobility Stabilization Program',
    description: 'Vehicle repair assistance to prevent stability harm.',
    group: 'programs',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Mobility Stabilization',
      order: 31,
    },
  },

  // FSIP Program Family
  {
    id: 'program-fsip',
    path: '/programs/fsip',
    element: <ProgramFSIP />,
    title: 'Family Stability Intervention Program (FSIP)',
    description:
      'A coordinated support framework providing crisis navigation, resource hub, family repair pathways, and provider network.',
    group: 'fsip',
    nav: {
      header: true,
      mobile: true,
      footer: false,
      label: 'FSIP',
      order: 10,
    },
  },
  {
    id: 'fsip-direct',
    path: '/fsip',
    redirectTo: '/programs/fsip',
    title: 'Family Stability Intervention Program (FSIP)',
    description: 'Direct access to FSIP program overview.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'FSIP (Direct)',
      order: 11,
    },
  },
  {
    id: 'fsip-resource-hub',
    path: '/fsip/resource-hub',
    element: <FSIPResourceHub />,
    title: 'FSIP Resource Hub',
    description: 'Curated directory of verified family support resources.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Resource Hub',
      order: 12,
    },
  },
  {
    id: 'fsip-crisis-navigation',
    path: '/fsip/crisis-navigation',
    element: <FSIPCrisisNavigation />,
    title: 'FSIP Crisis Navigation',
    description: 'Emergency triage and pathway guidance for families in acute crisis.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Crisis Navigation',
      order: 13,
    },
  },
  {
    id: 'fsip-family-repair',
    path: '/fsip/family-repair',
    element: <FSIPFamilyRepair />,
    title: 'FSIP Family Repair',
    description: 'Structured intervention timeline for family relationship rebuilding.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Family Repair',
      order: 14,
    },
  },
  {
    id: 'fsip-provider-network',
    path: '/fsip/provider-network',
    element: <FSIPProviderNetwork />,
    title: 'FSIP Provider Network',
    description: 'Coordinated care across vetted service providers.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Provider Network',
      order: 15,
    },
  },
  {
    id: 'providers',
    path: '/providers',
    element: <Providers />,
    title: 'For Providers',
    description: 'Resources and partnership information for service providers.',
    group: 'fsip',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Providers',
      order: 16,
    },
  },

  // Resources
  {
    id: 'resources',
    path: '/resources',
    element: <ResourcesTools />,
    title: 'Resources & Tools',
    description: 'Family support resources and stability tools.',
    group: 'resources',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'Resources',
      order: 20,
    },
  },
  {
    id: 'resources-directory',
    path: '/resources/directory',
    element: <ResourcesDirectory />,
    title: 'Resource Directory',
    description: 'Searchable directory of family support services.',
    group: 'resources',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Directory',
      order: 21,
    },
  },
  {
    id: 'resources-directory-detail',
    path: '/resources/directory/:slug',
    element: <ResourceDetail />,
    title: 'Resource Details',
    description: 'Detailed information about a specific family support resource.',
    group: 'resources',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Resource Detail',
      order: 22,
    },
  },

  // Portals Entry
  {
    id: 'portals',
    path: '/portals',
    element: <Portals />,
    title: 'Portals',
    description: 'Access secure portals for families and service providers.',
    group: 'portals',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Portals',
      order: 39,
    },
  },

  // Authentication
  {
    id: 'login',
    path: '/login',
    element: <Login />,
    title: 'Login',
    description: 'Sign in to access protected areas.',
    group: 'system',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Login',
      order: 100,
    },
  },

  // Legacy Portal Redirects
  {
    id: 'legacy-portal-redirect',
    path: '/portal',
    element: <Navigate to="/family-portal" replace />,
    title: 'Family Portal Redirect',
    description: 'Redirect from legacy portal URL.',
    group: 'system',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Legacy Portal',
      order: 999,
    },
  },
  {
    id: 'legacy-support-portal-redirect',
    path: '/support-portal',
    element: <Navigate to="/provider-portal" replace />,
    title: 'Provider Portal Redirect',
    description: 'Redirect from legacy support portal URL.',
    group: 'system',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Legacy Support Portal',
      order: 999,
    },
  },

  // Portals (Auth Required)
  {
    id: 'family-portal',
    path: '/family-portal',
    element: <FamilyPortal />,
    title: 'Family Portal',
    description: 'Secure access to family case information and resources.',
    group: 'portals',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Family Portal',
      order: 40,
    },
    auth: {
      required: true,
      role: 'family',
    },
  },
  {
    id: 'provider-portal',
    path: '/provider-portal',
    element: <ProviderPortal />,
    title: 'Provider Portal',
    description: 'Provider dashboard for case management and coordination.',
    group: 'portals',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Provider Portal',
      order: 41,
    },
    auth: {
      required: true,
      role: 'provider',
    },
  },

  // Engagement
  {
    id: 'get-involved',
    path: '/get-involved',
    element: <GetInvolved />,
    title: 'Get Involved',
    description: 'Support our mission through volunteering, donations, and partnerships.',
    group: 'core',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Get Involved',
      order: 30,
      highlight: true,
    },
  },

  // Transparency & Legal
  {
    id: 'transparency',
    path: '/transparency',
    element: <Transparency />,
    title: 'Transparency',
    description: 'Financial reports, outcomes, and organizational accountability.',
    group: 'core',
    nav: {
      header: true,
      mobile: true,
      footer: true,
      label: 'Transparency',
      order: 50,
    },
  },
  {
    id: 'privacy-policy',
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your information.',
    group: 'legal',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Privacy Policy',
      order: 90,
    },
  },
  {
    id: 'terms-of-service',
    path: '/terms-of-service',
    element: <TermsOfService />,
    title: 'Terms of Service',
    description: 'Terms and conditions for using our website and services.',
    group: 'legal',
    nav: {
      header: false,
      mobile: true,
      footer: false,
      label: 'Terms of Service',
      order: 91,
    },
  },

  // System
  {
    id: 'not-found',
    path: '*',
    element: <NotFound />,
    title: '404 - Page Not Found',
    description: 'The requested page could not be found.',
    group: 'system',
    nav: {
      header: false,
      mobile: false,
      footer: false,
      label: 'Not Found',
      order: 999,
    },
  },
];
