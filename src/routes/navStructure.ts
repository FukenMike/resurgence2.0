export type NavRole = 'admin' | 'provider' | 'family';

export interface NavItem {
  label: string;
  path: string;
  highlight?: boolean;
  requireRole?: NavRole;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'start',
    label: 'Start',
    items: [
      { label: 'Home', path: '/' },
    ],
  },
  {
    id: 'get-help',
    label: 'Get Help',
    items: [
      { label: 'FSIP Overview', path: '/programs/fsip' },
      { label: 'Crisis Navigation', path: '/fsip/crisis-navigation' },
      { label: 'Resource Hub', path: '/fsip/resource-hub' },
      { label: 'Family Repair', path: '/fsip/family-repair' },
      { label: 'Resource Directory', path: '/resources/directory' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs',
    items: [
      { label: 'Our Programs', path: '/programs' },
      { label: 'Mobility Stabilization', path: '/programs/mobility-stabilization' },
    ],
  },
  {
    id: 'providers',
    label: 'Providers',
    items: [
      { label: 'For Providers', path: '/providers' },
      { label: 'Provider Network', path: '/fsip/provider-network' },
      { label: 'Provider Portal', path: '/provider-portal', requireRole: 'provider' },
    ],
  },
  {
    id: 'portals',
    label: 'Portals',
    items: [
      { label: 'Family Portal', path: '/family-portal', requireRole: 'family' },
    ],
  },
  {
    id: 'about-trust',
    label: 'About & Trust',
    items: [
      { label: 'Who We Serve', path: '/who-we-serve' },
      { label: 'How We Help', path: '/how-we-help' },
      { label: 'About', path: '/about' },
      { label: 'Transparency', path: '/transparency' },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    items: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
    ],
  },
];
