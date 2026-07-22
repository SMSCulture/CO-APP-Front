import { useState } from 'react';
import { View } from 'react-native';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Input, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';

interface FieldProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  placeholder: string;
}

/** Label turns red when the field is empty — per explicit request. */
function ProfileField({ label, value, onChangeText, editable = true, placeholder }: FieldProps) {
  const theme = useAppTheme();
  const empty = value.trim().length === 0;

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text variant="label" color={empty ? theme.colors.danger : theme.colors.textMuted} style={{ marginBottom: spacing.xs }}>
        {label}
      </Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        style={empty ? { borderColor: theme.colors.danger } : undefined}
      />
    </View>
  );
}

/**
 * Email / Gender / Phone number / Birthday. Only email exists on the real
 * User type today — gender/phone/birthday aren't backed by any API yet, so
 * they're local-only state here (same "not wired to backend yet" honesty as
 * the other stub screens) rather than silently pretending to save.
 */
export function EditProfileScreen() {
  const { user } = useAuth();
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');

  return (
    <Screen scroll>
      <DetailScreenHeader title="Edit Profile" />
      <Text muted style={{ marginBottom: spacing.xl }}>
        Gender, phone, and birthday aren&apos;t connected to your account yet — changes here won&apos;t save until that&apos;s wired up.
      </Text>

      <ProfileField label="Email" value={user?.email ?? ''} editable={false} placeholder="you@example.com" />
      <ProfileField label="Gender" value={gender} onChangeText={setGender} placeholder="Add gender" />
      <ProfileField label="Phone number" value={phone} onChangeText={setPhone} placeholder="Add phone number" />
      <ProfileField label="Birthday" value={birthday} onChangeText={setBirthday} placeholder="MM/DD/YYYY" />
    </Screen>
  );
}
