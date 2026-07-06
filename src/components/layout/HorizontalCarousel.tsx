import type { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { spacing } from '../../design/tokens';

/** Horizontally scrolling row that bleeds past screen padding. */
export function HorizontalCarousel({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -spacing.screenX }}
      contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
    >
      {children}
    </ScrollView>
  );
}
