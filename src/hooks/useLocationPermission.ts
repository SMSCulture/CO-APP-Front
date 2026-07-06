/**
 * Location permission placeholder. When real geolocation lands (expo-location),
 * this hook will request permission and expose coordinates for the
 * publicEventsFeed lat/lng input. Mock coordinates = downtown Miami.
 */
export function useLocationPermission() {
  return {
    granted: false,
    coordinates: { latitude: 25.7743, longitude: -80.1937 },
    requestPermission: async () => false,
  };
}
