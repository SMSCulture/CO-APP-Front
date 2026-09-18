import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Pressable, Share, View } from 'react-native';
import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Input, Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { CURRENT_USER_ID, otherUserId, useSocialStore } from '../../store/socialStore';
import { useToastStore } from '../../store/toastStore';
import { FriendRow } from './FriendRow';

const contactMatches = ['usr-maya', 'usr-nina'];
const inviteContacts = [
  { id: 'contact-danielle', name: 'Danielle Ross', initials: 'DR' },
  { id: 'contact-marco', name: 'Marco Silva', initials: 'MS' },
];

export function FindFriendsScreen() {
  const theme = useAppTheme();
  const [q, setQ] = useState('');
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [contactsSynced, setContactsSynced] = useState(false);
  const { users, friendships, addFriend } = useSocialStore();
  const showToast = useToastStore((s) => s.show);
  const connected = new Set(
    friendships
      .filter(
        (f) =>
          [f.requesterUserId, f.recipientUserId].includes(CURRENT_USER_ID) &&
          f.status !== 'declined',
      )
      .map(otherUserId),
  );
  const results = q.trim()
    ? users.filter(
        (u) => u.id !== CURRENT_USER_ID && u.name.toLowerCase().includes(q.toLowerCase()),
      )
    : [];
  const matches = users.filter((u) => contactMatches.includes(u.id));

  const requestContactAccess = () => {
    setPermissionOpen(false);
    setContactsSynced(true);
    showToast(
      { message: 'Contacts matched. Nothing was posted or shared.', variant: 'success' },
      3500,
    );
  };
  const invite = async (name: string) => {
    await Share.share({
      message:
        'Join me on CultureOwl to find events we can go to together: https://www.cultureowl.com',
    });
    showToast({ message: `Invite for ${name} opened`, variant: 'success' }, 3000);
  };

  return (
    <Screen scroll>
      <DetailScreenHeader title="Find friends" />
      <Input placeholder="Search by name" value={q} onChangeText={setQ} />

      {!contactsSynced ? (
        <View
          style={{
            marginTop: spacing.lg,
            padding: spacing.lg,
            borderRadius: radius.xl,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            gap: spacing.sm,
          }}
        >
          <Text variant="heading">Find people you know</Text>
          <Text muted>
            See which contacts already use CultureOwl. We only use contact details to find matches.
          </Text>
          <Button label="Sync contacts" onPress={() => setPermissionOpen(true)} fullWidth />
          <Text variant="caption" muted style={{ textAlign: 'center' }}>
            You choose who to add or invite.
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text variant="heading">On CultureOwl</Text>
            <Text variant="caption" muted>
              {matches.length} matches
            </Text>
          </View>
          {matches.map((u) => (
            <FriendRow
              key={u.id}
              user={u}
              action={connected.has(u.id) ? 'Pending' : 'Add'}
              onAction={connected.has(u.id) ? undefined : () => addFriend(u.id)}
            />
          ))}
          <Text variant="heading" style={{ marginTop: spacing.md }}>
            Invite from contacts
          </Text>
          {inviteContacts.map((contact) => (
            <View
              key={contact.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.md,
                paddingVertical: spacing.sm,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: palette.blueLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text variant="bodyBold" color={palette.blueDark}>
                  {contact.initials}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyBold">{contact.name}</Text>
                <Text variant="caption" muted>
                  Not on CultureOwl yet
                </Text>
              </View>
              <Button
                label="Invite"
                variant="secondary"
                onPress={() => invite(contact.name)}
                style={{
                  minHeight: 40,
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.lg,
                }}
              />
            </View>
          ))}
          <Pressable onPress={() => setContactsSynced(false)}>
            <Text
              variant="caption"
              color={palette.blue}
              style={{ textAlign: 'center', padding: spacing.md }}
            >
              Disconnect contacts
            </Text>
          </Pressable>
        </View>
      )}

      {results.length ? (
        <View style={{ marginTop: spacing.xl }}>
          <Text variant="heading">Search results</Text>
          {results.map((u) => (
            <FriendRow
              key={u.id}
              user={u}
              action={connected.has(u.id) ? 'Pending' : 'Add'}
              onAction={connected.has(u.id) ? undefined : () => addFriend(u.id)}
            />
          ))}
        </View>
      ) : null}

      <Modal
        visible={permissionOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPermissionOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(10,16,24,.52)',
            justifyContent: 'center',
            padding: spacing.xl,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surfaceElevated,
              borderRadius: radius.xl,
              padding: spacing.xl,
              gap: spacing.md,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                alignSelf: 'center',
                backgroundColor: palette.blueLight,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 28 }}>👥</Text>
            </View>
            <Text variant="title" style={{ textAlign: 'center' }}>
              Find your people
            </Text>
            <Text muted style={{ textAlign: 'center' }}>
              Allow CultureOwl to check your contacts for people already here. Contact details stay
              private and invites are never sent automatically.
            </Text>
            <Button label="Allow contact access" fullWidth onPress={requestContactAccess} />
            <Button
              label="Not now"
              fullWidth
              variant="ghost"
              onPress={() => setPermissionOpen(false)}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
