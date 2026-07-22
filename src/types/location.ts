/** Mirrors CityData from the web frontend's lib/constants/florida-cities.ts */
export interface CityData {
  city: string;
  state: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  eventCount?: number;
}

export interface RecentLocation extends CityData {
  timestamp: number;
}
