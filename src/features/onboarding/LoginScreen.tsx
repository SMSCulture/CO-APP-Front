import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Button, Input, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { useToastStore } from '../../store/toastStore';

/**
 * Passwordless OTP entry — email first, then code (web parity: /auth/unified,
 * which also leads with OAuthButtons before the email field). Google/Facebook
 * aren't wired to a real provider yet (no expo-auth-session/native config in
 * this app), so they show the same honest "coming soon" toast pattern used
 * elsewhere rather than faking a working sign-in.
 *
 * Tighter than a typical web auth page — no hero image carousel, no
 * multi-column layout; just a short brand line + form, sized for a phone
 * screen (per explicit request to make this "tight for an app").
 */
export function LoginScreen() {
  const theme = useAppTheme();
  const { requestCode } = useAuth();
  const showToast = useToastStore((s) => s.show);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = /.+@.+\..+/.test(email.trim());

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await requestCode(email.trim().toLowerCase());
      router.push('/(public)/verify-code');
    } catch {
      setError('We couldn’t send a code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const oauthComingSoon = (provider: string) => {
    showToast({ message: `Sign in with ${provider} is coming soon`, variant: 'error' }, 3500);
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.lg }}>
        <View style={{ gap: spacing.xs, marginBottom: spacing.sm }}>
          <Text variant="title">Welcome to CultureOwl</Text>
          <Text muted>Discover local events, venues, and restaurants — and never miss what’s happening near you.</Text>
        </View>

        <View style={{ gap: spacing.sm }}>
          <OAuthButton label="Continue with Google" onPress={() => oauthComingSoon('Google')} />
          <OAuthButton label="Continue with Facebook" onPress={() => oauthComingSoon('Facebook')} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
          <Text variant="caption" muted>
            or continue with email
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
        </View>

        <Input
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Email address"
        />
        {error ? <Text color={theme.colors.danger}>{error}</Text> : null}
        <Button label="Send code" fullWidth loading={loading} disabled={!isValidEmail} onPress={onSubmit} />
        <Text variant="caption" muted style={{ textAlign: 'center' }}>
          New here? We’ll create your account automatically.
        </Text>
      </View>
    </Screen>
  );
}

function OAuthButton({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: radius.full,
        paddingVertical: spacing.sm + 4,
        alignItems: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text variant="bodyBold">{label}</Text>
    </Pressable>
  );
}
