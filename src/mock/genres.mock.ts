import type { MainGenre } from '../types/genre';

/**
 * Mock main genres — the real 6-category list as given: Art & Museums,
 * Dance & Theater, Music, Classes, Festivals & Fairs, Kids & Family.
 * 'theatre' id now covers both theatre- and dance-tagged mock events (one
 * combined "Dance & Theater" row — GenreEventRows fetches one tagId per
 * row, so a merged display needs a merged id, not two separate rows).
 * Every id now has >= 4 mock events (see events.mock.ts) so all 6 rows
 * actually render in mock mode.
 */
export const mockMainGenres: MainGenre[] = [
  { id: 'art', name: 'art_and_museum', display: 'Art & Museums', isGenrePage: true, order: 0 },
  { id: 'theatre', name: 'THEATER', display: 'Dance & Theater', isGenrePage: true, order: 1 },
  { id: 'music', name: 'MUSIC', display: 'Music', isGenrePage: true, order: 2 },
  { id: 'classes', name: 'CLASS', display: 'Classes', isGenrePage: true, order: 3 },
  { id: 'food', name: 'FESTIVAL', display: 'Festivals & Fairs', isGenrePage: true, order: 4 },
  { id: 'museums', name: 'KIDS', display: 'Kids & Family', isGenrePage: true, order: 5 },
];
