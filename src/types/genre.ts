/** Mirrors MainGenre from types/genres.ts on web (lib/graphql/tags.ts's GET_MAIN_GENRES). */
export interface MainGenre {
  id: string;
  name: string;
  display: string;
  type?: string;
  color?: string;
  order?: number;
  isGenrePage?: boolean;
  icon?: string;
  iconUrl?: string;
}
