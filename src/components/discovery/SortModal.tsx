import { useEffect, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Button, Text } from '../ui';

export type SortOption = 'POPULARITY' | 'PRICE_ASC' | 'RATING' | 'DATE' | 'DISTANCE';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'POPULARITY', label: 'Popularity' },
  { value: 'PRICE_ASC', label: 'Price (Low to High)' },
  { value: 'RATING', label: 'Rating (From 5 to 0)' },
  { value: 'DATE', label: 'Next Date' },
  { value: 'DISTANCE', label: 'Distance' },
];

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  value: SortOption;
  onChange: (value: SortOption) => void;
}

/** Shared CultureOwl sort bottom sheet used anywhere the Date / Category / Sort bar appears. */
export function SortModal({ visible, onClose, value, onChange }: SortModalProps) {
  const theme = useAppTheme();
  const [pending, setPending] = useState(value);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setPending(value), 0);
    return () => clearTimeout(id);
  }, [value, visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'flex-end' }}>
        <Pressable onPress={onClose} accessibilityLabel="Close sort options" style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: theme.colors.surfaceElevated,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.lg,
            paddingBottom: spacing.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
            <Pressable accessibilityRole="button" accessibilityLabel="Close sort" onPress={onClose} hitSlop={8}>
              <Text style={{ fontSize: 30, lineHeight: 34 }}>×</Text>
            </Pressable>
            <Text variant="heading">Sort</Text>
            <View style={{ width: 30 }} />
          </View>

          {SORT_OPTIONS.map((option) => {
            const selected = pending === option.value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => setPending(option.value)}
                style={({ pressed }) => ({
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                  minHeight: 56, opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text variant="body" style={{ fontSize: 16 }}>{option.label}</Text>
                {selected ? (
                  <View style={{ width: 24, height: 24, borderRadius: radius.full, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                    <Text color={theme.colors.onPrimary} style={{ fontSize: 15, lineHeight: 18 }}>✓</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}

          <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.border, marginHorizontal: -spacing.xl, marginTop: spacing.md, paddingHorizontal: spacing.xl, paddingTop: spacing.xl }}>
            <Button label="Apply" fullWidth onPress={() => { onChange(pending); onClose(); }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
