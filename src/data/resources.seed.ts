/**
 * Resource Directory Seed Data
 * 
 * TODO: Replace with API/database calls when backend is ready
 * This stub data provides realistic sample resources for UI development
 * and testing. The structure is designed to map cleanly to a future DB schema.
 */

export type ResourceCategory =
  | 'Legal Services'
  | 'Housing Assistance'
  | 'Mental Health'
  | 'Employment Services'
  | 'Food & Basic Needs'
  | 'Healthcare'
  | 'Transportation'
  | 'Child Support'
  | 'Education & Training'
  | 'Emergency Services';

export type VerificationStatus = 'verified' | 'stale' | 'unverified';

export type AccessType = 'Walk-in' | 'Appointment' | 'Referral' | 'Online';

export interface ServiceArea {
  state: string;
  county?: string;
  city?: string;
  notes?: string;
}

export interface Resource {
  id: string;
  slug: string;
  name: string;
  category: ResourceCategory;
  description: string;
  whatTheyProvide: string[];
  serviceArea: ServiceArea;
  tags: string[];
  eligibility: string[];
  howToApply: string[];
  requiredDocuments: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  hours: string;
  cost: 'free' | 'paid' | 'sliding-scale';
  accessType: AccessType[];
  verificationStatus: VerificationStatus;
  lastVerified: string; // ISO date string
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Sample resources for development and testing
 * TODO: Replace with actual data from API endpoint
 */
export const resources: Resource[] = [
  {
    id: 'res-001',
    slug: 'legal-aid-society-family-law',
    name: 'Legal Aid Society - Family Law Division',
    category: 'Legal Services',
    description: 'Provides free legal representation and advice for low-income fathers in custody, visitation, and child support matters. Experienced attorneys available for court representation.',
    whatTheyProvide: [
      'Free legal consultation',
      'Court representation for custody cases',
      'Child support modification assistance',
      'Visitation rights advocacy',
      'Legal document preparation',
    ],
    serviceArea: {
      state: 'California',
      county: 'Los Angeles County',
      city: 'Los Angeles',
      notes: 'Serves all LA County residents',
    },
    tags: ['custody', 'child support', 'free legal aid', 'court representation'],
    eligibility: [
      'Income at or below 125% of federal poverty level',
      'Resident of Los Angeles County',
      'Family law matter pending or needed',
    ],
    howToApply: [
      'Call intake line at (213) 555-0123 Monday-Friday 9am-5pm',
      'Complete initial screening questionnaire over phone',
      'Provide proof of income (pay stubs, tax returns)',
      'Schedule in-person consultation within 2 weeks',
      'Bring all court documents to first appointment',
    ],
    requiredDocuments: [
      'Photo ID',
      'Proof of income (last 3 pay stubs or tax return)',
      'Proof of LA County residency',
      'Any existing court orders or legal documents',
      'Birth certificates of children involved',
    ],
    contactInfo: {
      phone: '(213) 555-0123',
      email: 'intake@legalaid-la.org',
      website: 'https://legalaid-la.org/family',
      address: '1550 W 8th St, Los Angeles, CA 90017',
    },
    hours: 'Monday-Friday 9:00 AM - 5:00 PM',
    cost: 'free',
    accessType: ['Appointment'],
    verificationStatus: 'verified',
    lastVerified: '2025-12-15',
    createdAt: '2025-01-10',
    updatedAt: '2025-12-15',
  },
  {
    id: 'res-002',
    slug: 'fathers-support-center',
    name: "Father's Support Center",
    category: 'Mental Health',
    description: 'Peer support groups and counseling specifically for fathers navigating separation, divorce, and custody challenges. Safe space to share experiences and build coping strategies.',
    whatTheyProvide: [
      'Weekly peer support groups',
      'Individual counseling sessions',
      'Grief and loss support',
      'Co-parenting workshops',
      'Anger management resources',
    ],
    serviceArea: {
      state: 'California',
      county: 'Orange County',
      city: 'Santa Ana',
    },
    tags: ['mental health', 'support groups', 'counseling', 'peer support'],
    eligibility: [
      'Fathers or father figures',
      'Experiencing family separation or custody issues',
      'No income restrictions',
    ],
    howToApply: [
      'Visit website and fill out intake form',
      'Attend orientation session (offered weekly on Thursdays at 7pm)',
      'Choose between group or individual support',
      'No referral needed',
    ],
    requiredDocuments: [
      'None required for first visit',
      'Insurance card if using for individual counseling',
    ],
    contactInfo: {
      phone: '(714) 555-0198',
      email: 'support@fatherscenter.org',
      website: 'https://fatherscenter.org',
      address: '2400 N Main St, Santa Ana, CA 92706',
    },
    hours: 'Groups: Tues/Thurs 7-9 PM, Individual sessions by appointment',
    cost: 'free',
    accessType: ['Walk-in', 'Appointment'],
    verificationStatus: 'verified',
    lastVerified: '2025-11-28',
  },
  {
    id: 'res-003',
    slug: 'pathways-housing-assistance',
    name: 'Pathways Housing Assistance Program',
    category: 'Housing Assistance',
    description: 'Emergency housing assistance and transitional housing for fathers at risk of homelessness. Provides rental assistance, security deposits, and housing navigation services.',
    whatTheyProvide: [
      'Emergency rental assistance (up to 3 months)',
      'Security deposit loans',
      'Transitional housing placement',
      'Housing search assistance',
      'Landlord mediation',
    ],
    serviceArea: {
      state: 'California',
      county: 'San Diego County',
      notes: 'Priority for Veterans and families with children',
    },
    tags: ['housing', 'rental assistance', 'emergency shelter', 'homelessness prevention'],
    eligibility: [
      'At risk of homelessness or currently homeless',
      'Father with custody or visitation rights',
      'Income below 50% Area Median Income',
      'San Diego County resident or willing to relocate',
    ],
    howToApply: [
      'Call crisis hotline: (619) 555-0156',
      'Complete housing assessment over phone',
      'Provide documentation within 48 hours',
      'Meet with housing navigator',
      'Funds distributed within 5-7 business days if approved',
    ],
    requiredDocuments: [
      'Proof of income or lack thereof',
      'Eviction notice or 30-day notice (if applicable)',
      'Photo ID',
      'Proof of custody or visitation agreement',
      'Proof of San Diego County ties',
    ],
    contactInfo: {
      phone: '(619) 555-0156',
      email: 'intake@pathwayshousing.org',
      website: 'https://pathwayshousing.org',
    },
    hours: '24/7 crisis hotline, Office hours Mon-Fri 8am-6pm',
    cost: 'free',
    accessType: ['Appointment', 'Referral'],
    verificationStatus: 'verified',
    lastVerified: '2026-01-02',
  },
  {
    id: 'res-004',
    slug: 'workforce-development-center',
    name: 'Workforce Development Center',
    category: 'Employment Services',
    description: 'Job training, placement services, and career counseling. Specializes in helping fathers with employment gaps due to incarceration, family crisis, or other barriers.',
    whatTheyProvide: [
      'Resume writing workshops',
      'Interview preparation',
      'Job placement assistance',
      'Skills training (construction, IT, healthcare)',
      'Employer connections',
      'Financial literacy courses',
    ],
    serviceArea: {
      state: 'California',
      county: 'Riverside County',
      city: 'Riverside',
    },
    tags: ['employment', 'job training', 'career services', 'reentry'],
    eligibility: [
      'Unemployed or underemployed',
      'Riverside County resident',
      'Must be able to commit to program schedule',
    ],
    howToApply: [
      'Walk in during intake hours: Mon/Wed 9am-12pm',
      'Or call to schedule appointment: (951) 555-0134',
      'Attend orientation session',
      'Complete skills assessment',
      'Enroll in appropriate training track',
    ],
    requiredDocuments: [
      'Photo ID',
      'Social Security card',
      'Resume (or help will be provided)',
      'Proof of Riverside County residency',
    ],
    contactInfo: {
      phone: '(951) 555-0134',
      email: 'jobs@workforcedev-rc.org',
      website: 'https://workforcedev-rc.org',
      address: '3900 Main St, Suite 200, Riverside, CA 92501',
    },
    hours: 'Monday-Thursday 8:00 AM - 5:00 PM, Friday 8:00 AM - 12:00 PM',
    cost: 'free',
    accessType: ['Walk-in', 'Appointment'],
    verificationStatus: 'stale',
    lastVerified: '2025-06-10',
  },
  {
    id: 'res-005',
    slug: 'community-food-bank',
    name: 'Community Food Bank',
    category: 'Food & Basic Needs',
    description: 'Weekly food distributions, emergency food boxes, and nutrition assistance. No income verification required. Helps fathers provide meals for their children during visitation.',
    whatTheyProvide: [
      'Weekly groceries (fresh produce, protein, shelf-stable items)',
      'Emergency 3-day food boxes',
      'Diapers and baby formula (when available)',
      'Holiday meal programs',
      'Nutrition education',
    ],
    serviceArea: {
      state: 'California',
      county: 'Kern County',
      city: 'Bakersfield',
    },
    tags: ['food assistance', 'groceries', 'emergency food', 'nutrition'],
    eligibility: [
      'No income restrictions',
      'All are welcome',
      'Priority for families with children',
    ],
    howToApply: [
      'No application needed for general distribution',
      'Simply show up during distribution hours',
      'Bring your own bags if possible',
      'For emergency boxes, call ahead',
    ],
    requiredDocuments: [
      'None required',
      'ID helpful but not mandatory',
    ],
    contactInfo: {
      phone: '(661) 555-0178',
      website: 'https://communityfoodbank-kern.org',
      address: '2005 Union Ave, Bakersfield, CA 93305',
    },
    hours: 'Distribution: Wednesdays and Saturdays 10:00 AM - 2:00 PM',
    cost: 'free',
    accessType: ['Walk-in'],
    verificationStatus: 'verified',
    lastVerified: '2025-12-20',
  },
  {
    id: 'res-006',
    slug: 'mobile-health-clinic',
    name: 'Mobile Health Clinic',
    category: 'Healthcare',
    description: 'Free medical and dental services via mobile clinic. Serves uninsured and underinsured individuals. No appointment needed for basic services.',
    whatTheyProvide: [
      'Primary care consultations',
      'Blood pressure and diabetes screening',
      'Basic dental cleanings and extractions',
      'Mental health screening',
      'Prescription assistance',
      'Health insurance enrollment help',
    ],
    serviceArea: {
      state: 'California',
      county: 'Fresno County',
      notes: 'Mobile clinic rotates between 5 locations weekly',
    },
    tags: ['healthcare', 'medical', 'dental', 'uninsured', 'mobile clinic'],
    eligibility: [
      'Uninsured or underinsured',
      'Fresno County resident',
      'All ages welcome',
    ],
    howToApply: [
      'Check weekly schedule on website for clinic locations',
      'Arrive during clinic hours - first come, first served',
      'Register at check-in window',
      'See provider based on triage priority',
    ],
    requiredDocuments: [
      'Photo ID preferred',
      'Proof of Fresno County residency',
      'Insurance card if applicable',
    ],
    contactInfo: {
      phone: '(559) 555-0142',
      email: 'info@mobilehealthfresno.org',
      website: 'https://mobilehealthfresno.org',
    },
    hours: 'Varies by location - check website for current schedule',
    cost: 'free',
    accessType: ['Walk-in'],
    verificationStatus: 'verified',
    lastVerified: '2025-12-01',
  },
  {
    id: 'res-007',
    slug: 'ride-share-program',
    name: 'Ride Share Program for Court & Visitation',
    category: 'Transportation',
    description: 'Free transportation assistance for fathers traveling to court hearings, custody exchanges, and visitation appointments. Helps overcome transportation barriers to maintaining parental involvement.',
    whatTheyProvide: [
      'Round-trip transportation to court',
      'Transportation to custody exchanges',
      'Rides to visitation centers',
      'Gas vouchers for personal vehicles',
      'Bus passes',
    ],
    serviceArea: {
      state: 'California',
      county: 'Sacramento County',
    },
    tags: ['transportation', 'court', 'visitation', 'rides'],
    eligibility: [
      'Active custody or visitation case',
      'No reliable transportation',
      'Sacramento County resident',
    ],
    howToApply: [
      'Call at least 48 hours before needed ride',
      'Provide court date/time or visitation schedule',
      'Confirm pickup location',
      'Volunteer driver will be assigned',
    ],
    requiredDocuments: [
      'Copy of court order or visitation schedule',
      'Photo ID',
    ],
    contactInfo: {
      phone: '(916) 555-0189',
      email: 'rides@rideshare-sac.org',
      website: 'https://rideshare-sac.org',
    },
    hours: 'Request line: Mon-Fri 7:00 AM - 7:00 PM',
    cost: 'free',
    accessType: ['Appointment'],
    verificationStatus: 'verified',
    lastVerified: '2025-11-15',
  },
  {
    id: 'res-008',
    slug: 'child-support-navigation',
    name: 'Child Support Navigation Services',
    category: 'Child Support',
    description: 'Free assistance understanding and navigating the child support system. Helps fathers understand their obligations, request modifications, and address enforcement issues.',
    whatTheyProvide: [
      'Child support calculator assistance',
      'Modification petition help',
      'Payment plan negotiation support',
      'Arrears management guidance',
      'Educational workshops on child support law',
    ],
    serviceArea: {
      state: 'California',
      notes: 'Serves all California counties via phone/video',
    },
    tags: ['child support', 'legal help', 'arrears', 'modification'],
    eligibility: [
      'California resident',
      'Non-custodial parent with child support order',
      'Any income level',
    ],
    howToApply: [
      'Call helpline for immediate phone consultation',
      'Or schedule video appointment via website',
      'Bring all child support documentation',
      'No referral needed',
    ],
    requiredDocuments: [
      'Current child support order',
      'Payment history (if available)',
      'Recent pay stubs',
      'Documentation of any changed circumstances',
    ],
    contactInfo: {
      phone: '(800) 555-0167',
      email: 'help@csnavigation.org',
      website: 'https://csnavigation.org',
    },
    hours: 'Phone line: Mon-Fri 8:00 AM - 8:00 PM, Video appointments available evenings/weekends',
    cost: 'free',
    accessType: ['Appointment', 'Online'],
    verificationStatus: 'verified',
    lastVerified: '2025-12-28',
  },
  {
    id: 'res-009',
    slug: 'vocational-training-academy',
    name: 'Vocational Training Academy',
    category: 'Education & Training',
    description: 'Certification programs in high-demand trades. Provides tools, training materials, and job placement assistance. Evening and weekend classes available for working parents.',
    whatTheyProvide: [
      'HVAC certification program (8 weeks)',
      'Electrician apprenticeship prep (10 weeks)',
      'Commercial driver\'s license (CDL) training (4 weeks)',
      'Medical assistant certification (12 weeks)',
      'IT support specialist training (6 weeks)',
    ],
    serviceArea: {
      state: 'California',
      county: 'Alameda County',
      city: 'Oakland',
    },
    tags: ['vocational training', 'certification', 'trade school', 'career'],
    eligibility: [
      'Age 18+',
      'High school diploma or GED',
      'Alameda County resident',
      'Pass background check (varies by program)',
    ],
    howToApply: [
      'Attend info session (held 1st and 3rd Tuesday monthly at 6pm)',
      'Complete application online',
      'Take placement test',
      'Interview with program coordinator',
      'Enroll in next available cohort',
    ],
    requiredDocuments: [
      'High school diploma or GED',
      'Photo ID',
      'Social Security card',
      'Proof of residency',
    ],
    contactInfo: {
      phone: '(510) 555-0145',
      email: 'admissions@vocationalacademy-oak.org',
      website: 'https://vocationalacademy-oak.org',
      address: '1800 Broadway, Oakland, CA 94612',
    },
    hours: 'Classes: Evening (6-10pm) and Saturday (8am-5pm)',
    cost: 'sliding-scale',
    accessType: ['Appointment'],
    verificationStatus: 'stale',
    lastVerified: '2025-07-22',
  },
  {
    id: 'res-010',
    slug: 'crisis-hotline-fathers',
    name: '24/7 Father Crisis Hotline',
    category: 'Emergency Services',
    description: 'Immediate crisis intervention for fathers experiencing mental health emergencies, thoughts of self-harm, or acute family crisis. Trained counselors available 24/7.',
    whatTheyProvide: [
      '24/7 crisis counseling',
      'Suicide prevention support',
      'Referrals to emergency services',
      'Safety planning',
      'Follow-up resource connections',
    ],
    serviceArea: {
      state: 'California',
      notes: 'Serves entire state',
    },
    tags: ['crisis', 'hotline', 'emergency', 'mental health', 'suicide prevention'],
    eligibility: [
      'Any father or father figure in crisis',
      'No restrictions',
    ],
    howToApply: [
      'Call hotline: (888) 555-DADS (3237)',
      'Text "FATHER" to 741741',
      'Available 24/7/365',
    ],
    requiredDocuments: [
      'None',
    ],
    contactInfo: {
      phone: '(888) 555-3237',
      website: 'https://fatherscrisisline.org',
    },
    hours: '24/7/365',
    cost: 'free',
    accessType: ['Online'],
    verificationStatus: 'verified',
    lastVerified: '2026-01-01',
  },
];

/**
 * Helper function to get resource by slug
 * TODO: Replace with API call
 */
export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}

/**
 * Helper function to get resources by category
 * TODO: Replace with filtered API call
 */
export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return resources.filter((resource) => resource.category === category);
}
