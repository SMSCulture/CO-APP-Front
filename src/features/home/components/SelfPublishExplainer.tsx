import { View } from 'react-native';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

const steps = [
  ['1', 'Upload', 'One event photo + the facts'],
  ['2', 'Review', 'CultureOwl checks quality and accuracy'],
  ['3', 'Auto-design', 'Crop, palette, type and subtle motion'],
  ['4', 'Publish', 'One clean event across every surface'],
];
export function SelfPublishExplainer() {
  const theme = useAppTheme();
  return (
    <View
      style={{
        marginTop: spacing.xl,
        padding: spacing.lg,
        borderRadius: radius.xl,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: spacing.md,
      }}
    >
      <View style={{ gap: 4 }}>
        <Text variant="label" color={theme.colors.primary}>
          HOW IT SCALES
        </Text>
        <Text variant="heading">One photo in. A polished event out.</Text>
        <Text muted>
          CultureOwl supplies the design system, so publishers never need video or design skills.
        </Text>
      </View>
      <View style={{ gap: spacing.sm }}>
        {steps.map(([n, title, detail]) => (
          <View key={n} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text variant="bodyBold" color={theme.colors.onPrimary}>
                {n}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyBold">{title}</Text>
              <Text variant="caption" muted>
                {detail}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text variant="caption" muted>
        V1: CultureOwl staff publishes. Later: organizers submit through the portal into the same
        review flow.
      </Text>
    </View>
  );
}
