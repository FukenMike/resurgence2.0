// Shared enums for resource link metadata
export type VerificationStatus = 'verified' | 'stale' | 'unverified';
export type AccessType = 'walk_in' | 'appointment' | 'referral' | 'online' | 'unknown';
export type CostType = 'free' | 'sliding' | 'paid' | 'unknown';

export interface ResourceLink {
  id: string; // stable slug/id used for anchors and localStorage keys
  title: string;
  summary: string;
  category: string;
  url: string;
  cost?: CostType;
  access?: AccessType;
  verification?: VerificationStatus;
  lastVerifiedAt?: string;
  tags?: string[];
}

export function formatAccessType(access: AccessType | undefined): string {
  if (!access) return 'Unknown';
  const labels: Record<AccessType, string> = {
    walk_in: 'Walk-in',
    appointment: 'Appointment',
    referral: 'Referral',
    online: 'Online',
    unknown: 'Unknown',
  };
  return labels[access] || 'Unknown';
}

export function formatCostType(cost: CostType | undefined): string {
  if (!cost) return 'Unknown';
  const labels: Record<CostType, string> = {
    free: 'Free',
    sliding: 'Sliding Scale',
    paid: 'Paid',
    unknown: 'Unknown',
  };
  return labels[cost] || 'Unknown';
}
