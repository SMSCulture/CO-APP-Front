import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { spacing } from '../../design/tokens';
import { mockEvents } from '../../mock/events.mock';
import { useSocialStore } from '../../store/socialStore';
export function FriendProfileScreen() {
  const { id } = useLocalSearchParams<{ id?: string; userId?: string }>();
  const userId = useLocalSearchParams<{ userId: string }>().userId || id;
  const { users, attendance } = useSocialStore();
  const user = users.find((u) => u.id === userId);
  if (!user)
    return (
      <Screen>
        <Text>User not found</Text>
      </Screen>
    );
  const events = attendance
    .filter((a) => a.userId === userId && a.visibility === 'friends')
    .map((a) => mockEvents.find((e) => e.id === a.eventId)!)
    .filter(Boolean);
  return (
    <Screen scroll>
      <DetailScreenHeader title={user.name} />
      <View style={{ alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl }}>
        <Image
          source={{ uri: user.avatarUrl ?? undefined }}
          style={{ width: 92, height: 92, borderRadius: 46, backgroundColor: palette.blueLight }}
        />
        <Text variant="title">{user.name}</Text>
        <Text muted>{user.city}</Text>
        <Text variant="caption" color={palette.blue}>
          Friends
        </Text>
      </View>
      <SectionHeader title={`Events ${user.name.split(' ')[0]} is going to`} />
      {events.length ? (
        <EventCarousel events={events} />
      ) : (
        <Text muted>No shared plans yet. The calendar is still open.</Text>
      )}
    </Screen>
  );
}
