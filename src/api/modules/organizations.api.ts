/** Arts groups — mirrors lib/graphql/public-arts-groups.ts on web. */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { mockOrganizations } from '../../mock/organizations.mock';
import type { Organization } from '../../types/organization';

const PUBLIC_ARTS_GROUPS_PAGINATED = /* GraphQL */ `
  query PublicArtsGroupsPaginated($first: Int!, $after: String) {
    publicArtsGroupsPaginated(first: $first, after: $after, includeTotalCount: true) {
      edges {
        node { id name slug artType imageUrl market description address }
        cursor
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const PUBLIC_ARTS_GROUP = /* GraphQL */ `
  query PublicArtsGroup($identifier: String!) {
    publicArtsGroup(identifier: $identifier) { id name slug artType imageUrl market description address }
  }
`;

interface ArtsGroupNode {
  id: string;
  name: string;
  slug: string;
  artType: string | null;
  imageUrl: string | null;
  market: string | null;
  description: string | null;
  address: string | null;
}

// No `city` field on this entity — arts groups are keyed by `market` +
// `address` instead (confirmed against lib/graphql/public-arts-groups.ts on
// web). Mapped onto the existing Organization.city field for display.
function mapArtsGroupNode(node: ArtsGroupNode): Organization {
  return {
    id: node.id,
    name: node.name,
    slug: node.slug,
    city: node.market ?? '',
    imageUrl: node.imageUrl,
    description: node.description,
    genres: node.artType ? [node.artType] : [],
  };
}

export interface OrganizationsPage {
  organizations: Organization[];
  endCursor: string | null;
  hasNextPage: boolean;
}

export async function fetchOrganizationsPage(after?: string): Promise<OrganizationsPage> {
  if (USE_MOCK_DATA) {
    return { organizations: mockOrganizations, endCursor: null, hasNextPage: false };
  }
  const data = await graphqlRequest<{
    publicArtsGroupsPaginated: { edges: { node: ArtsGroupNode; cursor: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
  }>(PUBLIC_ARTS_GROUPS_PAGINATED, { first: 20, after });
  return {
    organizations: data.publicArtsGroupsPaginated.edges.map((e) => mapArtsGroupNode(e.node)),
    endCursor: data.publicArtsGroupsPaginated.pageInfo.endCursor,
    hasNextPage: data.publicArtsGroupsPaginated.pageInfo.hasNextPage,
  };
}

/** Kept for the existing organization detail route (src/app/organizations/[organizationId].tsx). */
export async function fetchOrganizations(city?: string): Promise<Organization[]> {
  const { organizations } = await fetchOrganizationsPage();
  return city ? organizations.filter((o) => o.city === city) : organizations;
}

export async function fetchOrganization(identifier: string): Promise<Organization> {
  if (USE_MOCK_DATA) {
    const org = mockOrganizations.find((o) => o.id === identifier || o.slug === identifier);
    if (!org) throw new Error(`Organization not found: ${identifier}`);
    return org;
  }
  const data = await graphqlRequest<{ publicArtsGroup: ArtsGroupNode }>(PUBLIC_ARTS_GROUP, { identifier });
  return mapArtsGroupNode(data.publicArtsGroup);
}
