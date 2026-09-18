import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { mockCollections } from '../../../mock/collections.mock';
export function CollectionsRow() {
  return (
    <View>
      <SectionHeader
        title="Collections"
        actionLabel="View all"
        onAction={() => router.push('/collections/miami-after-dark')}
        spacious
      />
      <ScrollView
        horizontal
        decelerationRate="fast"
        snapToInterval={276}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -spacing.screenX }}
        contentContainerStyle={{ paddingHorizontal: spacing.screenX, gap: spacing.md }}
      >
        {mockCollections.map((c, i) => (
          <Pressable
            key={c.id}
            onPress={() => router.push(`/collections/${c.slug}`)}
            style={{ width: 260 }}
          >
            <View
              style={{
                height: 184,
                borderRadius: radius.lg,
                overflow: 'hidden',
                backgroundColor: '#18191d',
              }}
            >
              <Image
                source={{ uri: c.imageUrl }}
                contentFit="cover"
                style={{ position: 'absolute', inset: 0 }}
              />
              <View
                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8,9,13,.12)' }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: spacing.md,
                  left: spacing.md,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: radius.full,
                  backgroundColor: 'rgba(8,9,13,.74)',
                }}
              >
                <Text variant="label" color="#fff">
                  0{i + 1} · {c.eyebrow}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: spacing.sm, gap: 3 }}>
              <Text variant="heading" numberOfLines={1}>
                {c.title}
              </Text>
              <Text variant="caption" muted numberOfLines={2}>
                {c.description}
              </Text>
              <Text variant="bodyBold" style={{ marginTop: 2 }}>
                Open collection ↗
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
