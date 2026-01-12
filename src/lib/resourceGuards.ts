// Dev-only resource validation helpers to catch bad records early
export function isUuidLike(str: string): boolean {
  if (typeof str !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str.trim());
}

export function validateResourceListItem(resource: any): { ok: boolean; issues: string[] } {
  const issues: string[] = [];
  if (!resource?.id) issues.push('missing id');
  if (resource?.id && !isUuidLike(resource.id)) issues.push('id not uuid-like');
  if (!resource?.status) issues.push('missing status');
  if (!resource?.title) issues.push('missing title');
  if (!resource?.slug && !resource?.id) issues.push('missing slug and id');
  if (resource?.organization && typeof resource.organization.name !== 'string') {
    issues.push('organization.name missing or not string');
  }
  if (resource?.service_areas && !Array.isArray(resource.service_areas)) {
    issues.push('service_areas present but not array');
  }
  return { ok: issues.length === 0, issues };
}

export function validateResourceDetail(resource: any): { ok: boolean; issues: string[] } {
  const issues: string[] = [];
  if (!resource?.id) issues.push('missing id');
  if (resource?.id && !isUuidLike(resource.id)) issues.push('id not uuid-like');
  if (!resource?.status) issues.push('missing status');
  if (!resource?.title) issues.push('missing title');
  if (!resource?.slug && !resource?.id) issues.push('missing slug and id');
  if (resource?.organization && typeof resource.organization.name !== 'string') {
    issues.push('organization.name missing or not string');
  }
  if (resource?.service_areas && !Array.isArray(resource.service_areas)) {
    issues.push('service_areas present but not array');
  }
  return { ok: issues.length === 0, issues };
}
