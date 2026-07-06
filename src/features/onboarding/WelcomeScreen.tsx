import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

export function WelcomeScreen() {
  const theme = useAppTheme();
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'flex-end', gap: spacing.lg, paddingBottom: spacing['3xl'] }}>
        <Text variant="label" color={theme.colors.primary}>
          CultureOwl
        </Text>
        <Text variant="display">Find the culture in your city.</Text>
        <Text muted>
          Concerts, theatre, museums, festivals, and more — curated for the way you experience the
          arts.
        </Text>
        <Button label="Get started" fullWidth onPress={() => router.push('/(public)/login')} />
        <Button
          label="Browse as guest"
          variant="ghost"
          fullWidth
          onPress={() => router.replace('/(tabs)/home')}
        />
      </View>
    </Screen>
  );
}
