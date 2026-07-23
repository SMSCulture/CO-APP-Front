import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { ChatIcon, MailIcon, PhoneIcon, TicketIcon, WhatsAppIcon } from '../../components/layout/icons/MenuIcons';
import { Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { trackEvent } from '../../lib/analytics';

interface ContactOption {
  key: string;
  label: string;
  icon: ReactNode;
}

/**
 * Contact channel picker — rounded-square icon tiles, per explicit request.
 * None of these are wired to a real channel yet (no support-ticket backend,
 * no live-chat SDK, no confirmed phone number) — tapping tracks the intent
 * so we know which channel to build first, same honest pattern used
 * elsewhere rather than faking a working flow. WhatsApp is flagged as a
 * stand-in channel "for now" per the request, not a permanent one.
 */
export function ContactUsScreen() {
  const theme = useAppTheme();
  const iconColor = String(theme.colors.text);

  const options: ContactOption[] = [
    { key: 'ticket', label: 'Support Ticket', icon: <TicketIcon color={iconColor} size={28} /> },
    { key: 'chat', label: 'Live Chat', icon: <ChatIcon color={iconColor} size={28} /> },
    { key: 'call', label: 'Call Us', icon: <PhoneIcon color={iconColor} size={28} /> },
    { key: 'message', label: 'Send a Message', icon: <MailIcon color={iconColor} size={28} /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon color="#25D366" size={28} /> },
  ];

  return (
    <Screen scroll>
      <DetailScreenHeader title="Contact Us" />
      <Text muted style={{ marginBottom: spacing.lg }}>
        Pick whatever’s easiest — we’ll get back to you.
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
        {options.map((option) => (
          <Pressable
            key={option.key}
            accessibilityRole="button"
            onPress={() => trackEvent(`contact_${option.key}_placeholder_tap`)}
            style={({ pressed }) => ({
              width: '30%',
              aspectRatio: 1,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            {option.icon}
            <Text variant="caption" style={{ textAlign: 'center' }} numberOfLines={2}>
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
