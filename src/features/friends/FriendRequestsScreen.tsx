import { View } from 'react-native';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { CURRENT_USER_ID, useSocialStore } from '../../store/socialStore';
import { useToastStore } from '../../store/toastStore';
import { FriendRow } from './FriendRow';

export function FriendRequestsScreen() {
  const { users, friendships, accept, decline, restoreFriendship } = useSocialStore();
  const showToast = useToastStore((s) => s.show);
  const req = friendships.filter(
    (f) => f.status === 'pending' && f.recipientUserId === CURRENT_USER_ID,
  );
  const acceptRequest = (id: string, name: string) => {
    accept(id);
    showToast({ message: `You and ${name} are now friends`, variant: 'success' }, 3500);
  };
  const declineRequest = (id: string, name: string) => {
    const friendship = friendships.find(
      (f) => f.requesterUserId === id && f.recipientUserId === CURRENT_USER_ID,
    );
    if (!friendship) return;
    decline(id);
    showToast(
      {
        message: `Request from ${name} declined`,
        variant: 'success',
        action: { label: 'Undo', onPress: () => restoreFriendship(friendship) },
      },
      5000,
    );
  };
  return (
    <Screen scroll>
      <DetailScreenHeader title="Friend requests" />
      {req.map((f) => {
        const u = users.find((x) => x.id === f.requesterUserId)!;
        return (
          <View key={u.id}>
            <FriendRow user={u} />
            <View
              style={{
                flexDirection: 'row',
                gap: spacing.sm,
                marginLeft: 64,
                marginBottom: spacing.md,
              }}
            >
              <Button label="Accept" onPress={() => acceptRequest(u.id, u.name)} />
              <Button
                label="Decline"
                variant="secondary"
                onPress={() => declineRequest(u.id, u.name)}
              />
            </View>
          </View>
        );
      })}
      {!req.length ? (
        <Text muted style={{ textAlign: 'center', marginTop: spacing['3xl'] }}>
          You’re all caught up.
        </Text>
      ) : null}
    </Screen>
  );
}
