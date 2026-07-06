import { useState } from 'react';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { IconButton, Text } from '../ui';
import { SideDrawer } from './SideDrawer';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

/** Screen header with the top-right directories panel trigger. */
export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const theme = useAppTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.lg,
      }}
    >
      <View style={{ flex: 1 }}>
        {subtitle ? (
          <Text variant="label" color={theme.colors.primary}>
            {subtitle}
          </Text>
        ) : null}
        <Text variant="title">{title}</Text>
      </View>
      <IconButton accessibilityLabel="Open explore menu" onPress={() => setDrawerOpen(true)}>
        <Text variant="heading">☰</Text>
      </IconButton>
      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}
