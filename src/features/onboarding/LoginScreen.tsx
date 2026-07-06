import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';

/**
 * Passwordless OTP entry — email first, then code (web parity: /auth/unified).
 * OAuth (Google) can be added later via expo-auth-session.
 */
export function LoginScreen() {
  const { requestCode } = useAuth();
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

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.lg }}>
        <Text variant="title">Sign in or sign up</Text>
        <Text muted>
          Enter your email and we’ll send you a 6-digit code. New here? We’ll create your account
          automatically.
        </Text>
        <Input
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Email address"
        />
        {error ? <Text color="#e74e3d">{error}</Text> : null}
        <Button
          label="Send code"
          fullWidth
          loading={loading}
          disabled={!isValidEmail}
          onPress={onSubmit}
        />
      </View>
    </Screen>
  );
}
