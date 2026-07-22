/**
 * Recent city selections — mirrors hooks/use-recent-locations.ts on web,
 * AsyncStorage instead of localStorage.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import type { CityData, RecentLocation } from '../types/location';

const STORAGE_KEY = 'co-recent-locations';
const MAX_RECENT_LOCATIONS = 5;

export function useRecentLocations() {
  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as RecentLocation[];
          setRecentLocations(parsed.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_RECENT_LOCATIONS));
        }
      } catch {
        // ignore — recent locations are a convenience, not critical
      }
      setIsLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentLocations)).catch(() => {});
  }, [recentLocations, isLoaded]);

  const addRecentLocation = useCallback((location: CityData) => {
    setRecentLocations((prev) => {
      const existingIndex = prev.findIndex(
        (loc) => loc.city === location.city && loc.state === location.state,
      );
      const newLocation: RecentLocation = { ...location, timestamp: Date.now() };
      const updated =
        existingIndex !== -1
          ? [newLocation, ...prev.filter((_, i) => i !== existingIndex)]
          : [newLocation, ...prev];
      return updated.slice(0, MAX_RECENT_LOCATIONS);
    });
  }, []);

  return { recentLocations, addRecentLocation, isLoaded };
}
