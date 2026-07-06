export const APP_NAME = 'CultureOwl';

/** Mirrors the web frontend's genre/tag chips (genre-feed + discover nav). */
export const GENRES = [
  { id: 'music', name: 'Music' },
  { id: 'theatre', name: 'Theatre' },
  { id: 'dance', name: 'Dance' },
  { id: 'art', name: 'Visual Arts' },
  { id: 'museums', name: 'Museums' },
  { id: 'film', name: 'Film' },
  { id: 'family', name: 'Family' },
  { id: 'food', name: 'Art & Dine' },
  { id: 'festivals', name: 'Festivals' },
  { id: 'comedy', name: 'Comedy' },
] as const;

/** Florida markets, matching the web frontend's city switcher. */
export const CITIES = ['Miami', 'Fort Lauderdale', 'West Palm Beach', 'Orlando', 'Tampa'] as const;

export const DEFAULT_CITY = 'Miami';

/** Directory links shown in the side panel — mirrors the web top nav. */
export const DIRECTORY_LINKS = [
  { label: 'Events', route: '/(tabs)/search' },
  { label: 'Venues', route: '/venues' },
  { label: 'Arts Groups', route: '/organizations' },
  { label: 'Art & Dine', route: '/(tabs)/search' },
  { label: 'Map', route: '/map' },
] as const;

export const OTP_LENGTH = 6;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
