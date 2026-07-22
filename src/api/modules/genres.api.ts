/**
 * Main genres — mirrors GET_MAIN_GENRES (lib/graphql/tags.ts on web). These
 * are real backend tag records, not the old static GENRES list in
 * config/constants.ts, which had made-up ids that never matched real tag
 * ids once connected to a live backend (see GenreEventRows.tsx for the bug
 * this fixes).
 */
import { graphqlRequest } from '../client';
import { USE_MOCK_DATA } from '../../config/env';
import { mockMainGenres } from '../../mock/genres.mock';
import type { MainGenre } from '../../types/genre';

const GET_MAIN_GENRES = /* GraphQL */ `
  query GetMainGenres {
    mainGenres {
      id
      name
      display
      order
      isGenrePage
    }
  }
`;

interface MainGenresResponse {
  mainGenres: MainGenre[];
}

export async function fetchMainGenres(): Promise<MainGenre[]> {
  if (USE_MOCK_DATA) {
    return mockMainGenres;
  }
  const data = await graphqlRequest<MainGenresResponse>(GET_MAIN_GENRES);
  return data.mainGenres;
}
