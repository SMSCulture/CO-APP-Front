import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Input, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { CURRENT_USER_ID, otherUserId, useSocialStore } from '../../store/socialStore';
import { useToastStore } from '../../store/toastStore';
import { FriendRow } from './FriendRow';

export function FriendsScreen() {
  const [q, setQ] = useState('');
  const { users, friendships, removeFriend, restoreFriendship } = useSocialStore();
  const showToast = useToastStore((s) => s.show);
  const friends = friendships
    .filter(
      (f) =>
        f.status === 'accepted' && [f.requesterUserId, f.recipientUserId].includes(CURRENT_USER_ID),
    )
    .map((f) => users.find((u) => u.id === otherUserId(f))!)
    .filter(Boolean)
    .filter((u) => u.name.toLowerCase().includes(q.toLowerCase()));

  const remove = (userId: string, name: string) => {
    const friendship = friendships.find(
      (f) =>
        f.status === 'accepted' &&
        [f.requesterUserId, f.recipientUserId].includes(CURRENT_USER_ID) &&
        [f.requesterUserId, f.recipientUserId].includes(userId),
    );
    if (!friendship) return;
    removeFriend(userId);
    showToast(
      {
        message: `${name} removed from friends`,
        variant: 'success',
        action: { label: 'Undo', onPress: () => restoreFriendship(friendship) },
      },
      5000,
    );
  };

  return (
    <Screen scroll>
      <DetailScreenHeader title="Friends" />
      <Input placeholder="Search friends" value={q} onChangeText={setQ} />
      <View style={{ marginTop: spacing.lg }}>
        {friends.map((u) => (
          <FriendRow
            key={u.id}
            user={u}
            action="Remove"
            onAction={() => remove(u.id, u.name)}
            onPress={() => router.push(`/profile/friends/${u.id}`)}
          />
        ))}
      </View>
      {!friends.length ? (
        <Text muted style={{ textAlign: 'center', marginTop: spacing['3xl'] }}>
          No friends match that search.
        </Text>
      ) : null}
    </Screen>
  );
}
