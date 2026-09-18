import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Screen, Text } from '../../components/ui';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';

const SLIDES = [
  { title: 'Find what’s happening', body: 'Explore events, exhibitions, performances and unexpected local gems in your city.', kind: 'discover' },
  { title: 'Save your culture list', body: 'Heart events, venues, organizations and restaurants so every idea stays close.', kind: 'save' },
  { title: 'Make a night of it', body: 'Pair arts and culture with nearby restaurants, city guides and CultureOwl stories.', kind: 'plan' },
] as const;

function FeatureArt({ kind }: { kind: (typeof SLIDES)[number]['kind'] }) {
  return (
    <View style={{ width: 188, height: 188, borderRadius: 94, backgroundColor: 'rgba(255,255,255,0.72)', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={124} height={124} viewBox="0 0 124 124">
        {kind === 'discover' ? <><Circle cx="52" cy="52" r="34" fill="#3d98d3" opacity=".18"/><Circle cx="52" cy="52" r="25" fill="none" stroke="#3d98d3" strokeWidth="7"/><Path d="m71 72 25 25" stroke="#f47d30" strokeWidth="9" strokeLinecap="round"/><Path d="M52 35v34M35 52h34" stroke="#3d98d3" strokeWidth="5" strokeLinecap="round"/></> : null}
        {kind === 'save' ? <><Circle cx="62" cy="62" r="49" fill="#3d98d3" opacity=".15"/><Path d="M62 94S29 74 29 50c0-12 8-20 19-20 7 0 11 4 14 10 3-6 7-10 14-10 11 0 19 8 19 20 0 24-33 44-33 44Z" fill="#ef6258"/><Path d="M39 51c-2-8 4-13 11-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8"/></> : null}
        {kind === 'plan' ? <><Rect x="24" y="31" width="76" height="67" rx="13" fill="#fff" stroke="#3d98d3" strokeWidth="5"/><Path d="M24 52h76M43 24v15M81 24v15" stroke="#3d98d3" strokeWidth="6" strokeLinecap="round"/><Circle cx="48" cy="70" r="6" fill="#f47d30"/><Circle cx="70" cy="70" r="6" fill="#ef6258"/><Circle cx="48" cy="86" r="6" fill="#3d98d3"/></> : null}
      </Svg>
    </View>
  );
}

export function InviteFriendScreen() {
  const width = Dimensions.get('window').width;
  const cardWidth = Math.min(width - spacing.screenX * 2, 420);
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => setActive(Math.round(event.nativeEvent.contentOffset.x / cardWidth));

  return (
    <Screen>
      <DetailScreenHeader title="Share CultureOwl" fallbackHref="/(tabs)/profile" />
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: -spacing.screenX, paddingBottom: spacing.xl }}>
        <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onScrollEnd} snapToInterval={cardWidth} decelerationRate="fast" contentContainerStyle={{ paddingHorizontal: spacing.screenX }}>
          {SLIDES.map((slide, index) => (
            <View key={slide.title} style={{ width: cardWidth, paddingHorizontal: 6 }}>
              <View style={{ minHeight: 470, borderRadius: radius.xl, backgroundColor: index === 1 ? '#fff2ec' : '#e3f1fa', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', padding: spacing.xl, alignItems: 'center', justifyContent: 'center', gap: spacing.xl }}>
                <FeatureArt kind={slide.kind} />
                <Text variant="title" style={{ textAlign: 'center' }}>{slide.title}</Text>
                <Text muted style={{ textAlign: 'center', lineHeight: 24 }}>{slide.body}</Text>
                <Text variant="caption" color={palette.blue}>Swipe to see more</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View accessibilityLabel={`Feature ${active + 1} of ${SLIDES.length}`} style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg }}>
          {SLIDES.map((slide, index) => <View key={slide.title} style={{ width: index === active ? 22 : 8, height: 8, borderRadius: 4, backgroundColor: index === active ? palette.blue : palette.gray300 }} />)}
        </View>
      </View>
    </Screen>
  );
}
