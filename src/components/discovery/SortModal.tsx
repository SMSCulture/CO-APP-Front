import { Modal, Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

export type SortOption = 'DATE' | 'PRICE_ASC' | 'PRICE_DESC' | 'FREE_FIRST';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'DATE', label: 'Date' },
  { value: 'PRICE_ASC', label: 'Price: Low to High' },
  { value: 'PRICE_DESC', label: 'Price: High to Low' },
  { value: 'FREE_FIRST', label: 'Free events first' },
];

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortModal({ visible, onClose, value, onChange }: SortModalProps) {
  const theme = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'flex-end' }}>
        <Pressable onPress={onClose} accessibilityLabel="Close sort options" style={{ flex: 1 }} />
        <View
          style={{
            backgroundColor: theme.colors.surfaceElevated,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: spacing.lg,
          }}
        >
          <Text variant="heading" style={{ marginBottom: spacing.md }}>
            Sort by
          </Text>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              onPress={() => {
                onChange(option.value);
                onClose();
              }}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text variant="body">{option.label}</Text>
              {value === option.value ? (
                <View style={{ width: 20, height: 20, borderRadius: radius.full, backgroundColor: theme.colors.primary }} />
              ) : null}
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
