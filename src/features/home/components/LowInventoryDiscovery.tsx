import { router } from 'expo-router';
import { View } from 'react-native';
import { CultureNewsSection } from './CultureNewsSection';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Button, Text } from '../../../components/ui';
import { spacing } from '../../../design/tokens';

/** Keeps smaller markets useful without pretending they have more events than they do. */
export function LowInventoryDiscovery({ city, eventCount }: { city: string; eventCount: number }) {
  if (eventCount >= 8) return null;
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ gap: spacing.sm }}>
        <Text variant="heading">Culture around {city}</Text>
        <Text muted>{eventCount ? `That’s everything live in ${city} right now. Keep exploring nearby and through our local stories.` : `We’re still filling the calendar in ${city}. The culture is here even before every event is listed.`}</Text>
        <Button label="Explore nearby cities" variant="secondary" onPress={() => router.push('/(tabs)/search')} />
      </View>
      <SectionHeader title="Read while the calendar grows" actionLabel="All stories" onAction={() => router.push('/news')} />
      <CultureNewsSection />
    </View>
  );
}
