/** Arts groups — mirrors lib/graphql/public-arts-groups.ts on web. */
import { USE_MOCK_DATA } from '../../config/env';
import { mockOrganizations } from '../../mock/organizations.mock';
import type { Organization } from '../../types/organization';

export async function fetchOrganizations(city?: string): Promise<Organization[]> {
  if (USE_MOCK_DATA) {
    return city ? mockOrganizations.filter((o) => o.city === city) : mockOrganizations;
  }
  // TODO(backend): wire PublicArtsGroups query via graphqlRequest + mapRawArtsGroup.
  return [];
}

export async function fetchOrganization(identifier: string): Promise<Organization> {
  if (USE_MOCK_DATA) {
    const org = mockOrganizations.find((o) => o.id === identifier || o.slug === identifier);
    if (!org) throw new Error(`Organization not found: ${identifier}`);
    return org;
  }
  // TODO(backend): wire PublicArtsGroup query.
  throw new Error('Not implemented');
}
