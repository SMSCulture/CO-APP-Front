import { Image } from 'expo-image';
import { View } from 'react-native';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';
import { CURRENT_USER_ID, useSocialStore } from '../../store/socialStore';
import { useToastStore } from '../../store/toastStore';

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
      <DetailScreenHeader title="Friend requests" subtitle="People who want to connect with you" />
      <View style={{ gap: spacing.xs }}>
        {req.map((f) => {
          const u = users.find((x) => x.id === f.requesterUserId)!;
          return (
            <View
              key={u.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                paddingVertical: spacing.md,
              }}
            >
              <Image
                source={{ uri: u.avatarUrl ?? undefined }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: palette.blueLight,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text variant="bodyBold">{u.name}</Text>
                <Text variant="caption" muted>
                  {u.city}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                <Button
                  label="Accept"
                  onPress={() => acceptRequest(u.id, u.name)}
                  style={{
                    minHeight: 40,
                    paddingVertical: spacing.xs,
                    paddingHorizontal: spacing.md,
                  }}
                />
                <Button
                  label="Decline"
                  variant="secondary"
                  onPress={() => declineRequest(u.id, u.name)}
                  style={{
                    minHeight: 40,
                    paddingVertical: spacing.xs,
                    paddingHorizontal: spacing.md,
                    borderRadius: radius.full,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
      {!req.length ? (
        <Text muted style={{ textAlign: 'center', marginTop: spacing['3xl'] }}>
          You’re all caught up.
        </Text>
      ) : null}
    </Screen>
  );
}
