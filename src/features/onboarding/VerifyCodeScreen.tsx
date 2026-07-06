import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { Button, Input, Screen, Text } from '../../components/ui';
import { OTP_LENGTH, OTP_RESEND_COOLDOWN_SECONDS } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';
import { useAuthStore } from '../../auth/auth.store';

/** OTP entry — auto-submits at 6 digits, 60s resend cooldown (web parity). */
export function VerifyCodeScreen() {
  const { verifyCode, requestCode } = useAuth();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(OTP_RESEND_COOLDOWN_SECONDS);
  const submitted = useRef(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (code.length === OTP_LENGTH && !submitted.current) {
      submitted.current = true;
      setLoading(true);
      setError(null);
      verifyCode(code)
        .then(() => router.replace('/(tabs)/home'))
        .catch(() => {
          setError('That code didn’t work. Check it and try again.');
          setCode('');
          submitted.current = false;
        })
        .finally(() => setLoading(false));
    }
  }, [code, verifyCode]);

  const resend = async () => {
    if (!pendingEmail) return;
    await requestCode(pendingEmail);
    setCooldown(OTP_RESEND_COOLDOWN_SECONDS);
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', gap: spacing.lg }}>
        <Text variant="title">Enter your code</Text>
        <Text muted>
          We sent a {OTP_LENGTH}-digit code to {pendingEmail ?? 'your email'}. It expires in 10
          minutes.
        </Text>
        <Input
          placeholder="••••••"
          value={code}
          onChangeText={(v) => setCode(v.replace(/\D/g, '').slice(0, OTP_LENGTH))}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          accessibilityLabel="Verification code"
          style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8 }}
        />
        {error ? <Text color="#e74e3d">{error}</Text> : null}
        <Button
          label={cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
          variant="ghost"
          disabled={cooldown > 0 || loading}
          loading={loading}
          onPress={resend}
        />
      </View>
    </Screen>
  );
}
