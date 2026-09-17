import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { BuildingIcon, TicketIcon, MapIcon, NewspaperIcon, RestaurantIcon } from '../layout/icons/MenuIcons';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

const destinations = [
  { label: 'Events', note: 'What’s on now', icon: TicketIcon, go: () => router.push({ pathname: '/(tabs)/search', params: { browse: 'events' } }) },
  { label: 'Art organizations', note: 'Venues + arts groups', icon: BuildingIcon, go: () => router.push('/organizations') },
  { label: 'Restaurants', note: 'Make a night of it', icon: RestaurantIcon, go: () => router.push('/restaurants') },
  { label: 'Stories', note: 'Culture + industry', icon: NewspaperIcon, go: () => router.push('/news') },
  { label: 'Map', note: 'Explore by place', icon: MapIcon, go: () => router.push('/map') },
] as const;

/** CultureOwl's search jump-off: destinations describe our cultural ecosystem, not Fever's category taxonomy. */
export function SearchDestinations() {
  const theme = useAppTheme();
  return <View style={{ gap: spacing.sm }}>{destinations.map(({ label, note, icon: Icon, go }) => (
    <Pressable key={label} accessibilityRole="button" onPress={go} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.lg, backgroundColor: theme.colors.surface, opacity: pressed ? .82 : 1, transform: [{ scale: pressed ? .99 : 1 }] })}>
      <View style={{ width: 42, height: 42, borderRadius: radius.full, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}><Icon color={String(theme.colors.primary)} size={20} /></View>
      <View style={{ flex: 1 }}><Text variant="bodyBold">{label}</Text><Text variant="caption" muted>{note}</Text></View>
      <Text color={theme.colors.primary}>→</Text>
    </Pressable>
  ))}</View>;
}
