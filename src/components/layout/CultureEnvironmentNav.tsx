import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';
import { TabBarIcon } from './TabBarIcon';

const exits = [
  { label: 'For you', icon: 'home' as const, href: '/(tabs)/home' as const },
  { label: 'Explore', icon: 'search' as const, href: '/(tabs)/search' as const },
  { label: 'Discover', icon: 'discover' as const, href: '/(tabs)/discover' as const },
  { label: 'Tickets', icon: 'tickets' as const, href: '/(tabs)/tickets' as const },
  { label: 'Profile', icon: 'profile' as const, href: '/(tabs)/profile' as const },
];

/** Keeps every Culture News depth one tap from the app's main environments. */
export function CultureEnvironmentNav() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: 60 + insets.bottom,
        paddingTop: 8,
        paddingBottom: insets.bottom + 5,
        paddingHorizontal: spacing.sm,
        backgroundColor: theme.colors.tabBarBackground,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        flexDirection: 'row',
      }}
    >
      {exits.map((item) => (
        <Pressable
          key={item.label}
          accessibilityRole="tab"
          accessibilityLabel={item.label}
          onPress={() => router.replace(item.href)}
          style={({ pressed }) => ({
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            opacity: pressed ? 0.55 : 1,
          })}
        >
          <TabBarIcon name={item.icon} color={theme.colors.tabInactive} focused={false} />
          <Text variant="caption" color={theme.colors.tabInactive} style={{ fontSize: 11 }}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
