/** Arts groups / organizations (web: public-arts-groups.ts). */
export interface Organization {
  id: string;
  name: string;
  slug: string;
  city: string;
  imageUrl: string | null;
  description: string | null;
  genres: string[];
}
