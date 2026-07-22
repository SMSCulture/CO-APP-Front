/** No backend query exists for restaurants yet — mock-data-only MVP, shaped to mirror Venue/Organization. */
export type PriceLevel = '$' | '$$' | '$$$' | '$$$$';

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  imageUrl: string | null;
  description: string | null;
  cuisine: string;
  priceLevel: PriceLevel;
}
