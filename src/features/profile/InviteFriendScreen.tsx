import { useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

const INVITE_SUBJECT = 'Come discover CultureOwl with me';
const INVITE_BODY = `I found CultureOwl, a new way to discover arts, music, performances, museums and cultural events nearby.

Come find our next outing with me:
https://www.cultureowl.com

See you out there,
Sean`;

export function InviteFriendScreen() {
  const theme = useAppTheme();
  const [entry, setEntry] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(true);
  const validEntry = /^\S+@\S+\.\S+$/.test(entry.trim());
  const addRecipient = () => {
    const email = entry.trim().toLowerCase();
    if (!validEntry || recipients.includes(email)) return;
    setRecipients((current) => [...current, email]);
    setEntry('');
  };
  const recipientLabel = useMemo(
    () => recipients.length ? `${recipients.length} selected` : 'No one selected yet',
    [recipients.length],
  );

  return (
    <Screen scroll>
      <DetailScreenHeader title="Invite to CultureOwl" fallbackHref="/(tabs)/profile" />
      <View style={{ gap: spacing.xl }}>
        <View style={{ gap: 5 }}>
          <Text variant="title">Build your culture circle</Text>
          <Text muted>Add the people you want to explore with. Nothing sends until the final review.</Text>
        </View>

        <View style={{ gap: spacing.sm }}>
          <Text variant="label">EMAIL ADDRESS</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <TextInput
              accessibilityLabel="Friend email address"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="friend@example.com"
              placeholderTextColor={theme.colors.textMuted}
              value={entry}
              onChangeText={setEntry}
              onSubmitEditing={addRecipient}
              style={{
                flex: 1,
                minHeight: 52,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                paddingHorizontal: spacing.md,
              }}
            />
            <Button label="Add" disabled={!validEntry} onPress={addRecipient} />
          </View>
          <Text variant="caption" muted>{recipientLabel}</Text>
        </View>

        {recipients.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
            {recipients.map((email) => (
              <Pressable
                key={email}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${email}`}
                onPress={() => setRecipients((current) => current.filter((item) => item !== email))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.sm,
                  borderRadius: radius.full,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  backgroundColor: theme.colors.surface,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <Text variant="caption">{email}</Text><Text muted>×</Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}

        <View style={{ borderRadius: radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border }}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: previewOpen }}
            onPress={() => setPreviewOpen((open) => !open)}
            style={{
              padding: spacing.lg,
              backgroundColor: theme.scheme === 'dark' ? palette.gray800 : palette.blueLight,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ gap: 3 }}>
              <Text variant="label" color={palette.blueDark}>INVITE EMAIL PREVIEW</Text>
              <Text variant="bodyBold">{INVITE_SUBJECT}</Text>
            </View>
            <Text style={{ fontSize: 22 }}>{previewOpen ? '−' : '+'}</Text>
          </Pressable>
          {previewOpen ? (
            <View style={{ padding: spacing.lg, gap: spacing.md, backgroundColor: theme.colors.surface }}>
              <View><Text variant="caption" muted>Subject</Text><Text variant="bodyBold">{INVITE_SUBJECT}</Text></View>
              <View style={{ height: 1, backgroundColor: theme.colors.border }} />
              <Text style={{ lineHeight: 25 }}>{INVITE_BODY}</Text>
            </View>
          ) : null}
        </View>

        <Button label="Review invites" disabled={!recipients.length} onPress={() => setPreviewOpen(true)} fullWidth />
        <Text variant="caption" muted style={{ textAlign: 'center' }}>
          Preview only. Sending will be connected after the invite service and email permissions are in place.
        </Text>
      </View>
    </Screen>
  );
}
