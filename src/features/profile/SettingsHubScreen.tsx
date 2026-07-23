import { router } from 'expo-router';
import { useState } from 'react';
import { Linking } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import {
  BellIcon,
  CreditCardIcon,
  EditIcon,
  FileTextIcon,
  LogoutIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
  TrashIcon,
} from '../../components/layout/icons/MenuIcons';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Screen, Toggle } from '../../components/ui';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { trackEvent } from '../../lib/analytics';
import { IconMenuRow } from './components/IconMenuRow';

/**
 * Four sections (Communication Preferences, Location Permission, Legal,
 * Account) — the SECTION HEADERS are plain text (no icon), each ROW inside
 * gets an icon instead. Only the two notification-preference rows
 * (Notifications, Email) are real on/off toggles — Enable my location and
 * everything under Legal/Account are tappable rows, matching how those
 * actually behave (location permission has to go through OS settings; the
 * rest are navigation/destructive actions, not preferences to flip).
 * "Edit Profile" moved back here (was briefly a shortcut on ProfileScreen's
 * top bar) — its own "Profile" section header, first on the page.
 */
export function SettingsHubScreen() {
  const theme = useAppTheme();
  const { signOut } = useAuth();
  const iconColor = String(theme.colors.text);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <Screen scroll>
      <DetailScreenHeader title="Settings" />

      <SectionHeader title="Profile" />
      <IconMenuRow icon={<EditIcon color={iconColor} />} label="Edit Profile" onPress={() => router.push('/profile/edit')} />

      <SectionHeader title="Communication Preferences" />
      <IconMenuRow
        icon={<BellIcon color={iconColor} />}
        label="Notifications"
        right={<Toggle value={notificationsEnabled} onValueChange={setNotificationsEnabled} />}
      />
      <IconMenuRow
        icon={<MailIcon color={iconColor} />}
        label="Email"
        right={<Toggle value={emailEnabled} onValueChange={setEmailEnabled} />}
      />

      <SectionHeader title="Location Permission" />
      <IconMenuRow
        icon={<MapPinIcon color={iconColor} />}
        label="Enable my location"
        description="Manage location access in your device settings"
        onPress={() => Linking.openSettings()}
      />

      <SectionHeader title="Legal" />
      <IconMenuRow
        icon={<FileTextIcon color={iconColor} />}
        label="Terms & Conditions"
        onPress={() => trackEvent('terms_placeholder_tap')}
      />
      <IconMenuRow
        icon={<ShieldIcon color={iconColor} />}
        label="Privacy Policy"
        onPress={() => trackEvent('privacy_policy_placeholder_tap')}
      />

      <SectionHeader title="Account" />
      <IconMenuRow
        icon={<CreditCardIcon color={iconColor} />}
        label="Delete Payment Methods"
        onPress={() => trackEvent('delete_payment_methods_placeholder_tap')}
      />
      <IconMenuRow
        icon={<TrashIcon color={String(theme.colors.danger)} />}
        label="Delete Account"
        destructive
        onPress={() => trackEvent('delete_account_placeholder_tap')}
      />
      <IconMenuRow
        icon={<LogoutIcon color={String(theme.colors.danger)} />}
        label="Logout"
        destructive
        onPress={() => {
          signOut();
          trackEvent('sign_out');
          router.replace('/(tabs)/home');
        }}
      />
    </Screen>
  );
}
