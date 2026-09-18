import { Image } from 'expo-image';
import { Linking, Pressable, View } from 'react-native';
import { AppHeader } from '../layout/AppHeader';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Button, Card, Text } from '../ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventSummary } from '../../types/event';
import { EventCarousel } from '../discovery/EventCarousel';

interface PresenterProfileProps {
  kind: 'Arts group' | 'Venue';
  name: string;
  location: string;
  imageUrl: string | null;
  description: string | null;
  category?: string | null;
  address?: string | null;
  websiteUrl?: string | null;
  videoUrl?: string | null;
  coordinates?: { latitude: number; longitude: number } | null;
  events: EventSummary[];
}

export function PresenterProfile(props: PresenterProfileProps) {
  const theme = useAppTheme();
  const hero = props.imageUrl ?? 'https://picsum.photos/seed/culture-presenter/1200/800';
  return (
    <View style={{ gap: spacing.xl }}>
      <AppHeader title="Presenter" showLocation={false} />
      <View style={{ marginHorizontal: -spacing.screenX }}>
        <Image
          source={{ uri: hero }}
          contentFit="cover"
          style={{ width: '100%', aspectRatio: 16 / 10, backgroundColor: theme.colors.skeleton }}
        />
        <View
          style={{
            paddingHorizontal: spacing.screenX,
            paddingTop: spacing.lg,
            gap: spacing.md,
          }}
        >
          <View style={{ gap: 6 }}>
            <Text variant="label" color={theme.colors.primary}>
              {props.kind.toUpperCase()} · {(props.category ?? 'CULTURE').replaceAll('_', ' ')}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.bold,
                fontSize: 32,
                lineHeight: 38,
                fontWeight: '700',
              }}
            >
              {props.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <MapPinIcon color={String(theme.colors.textMuted)} size={16} />
              <Text muted>{props.location}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <Button label="Follow" style={{ flex: 1 }} onPress={() => {}} />
        <Button label="Share" variant="secondary" style={{ flex: 1 }} onPress={() => {}} />
        {props.websiteUrl ? (
          <Button
            label="Website"
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => Linking.openURL(props.websiteUrl!)}
          />
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {[
          ['Upcoming', String(props.events.length)],
          ['Type', props.kind],
          ['Based in', props.location.split(',')[0]],
        ].map(([label, value]) => (
          <Card key={label} style={{ flex: 1, padding: spacing.md }}>
            <Text variant="bodyBold">{value}</Text>
            <Text variant="caption" muted>
              {label}
            </Text>
          </Card>
        ))}
      </View>
      <View style={{ gap: spacing.sm }}>
        <Text variant="heading">About</Text>
        <Text style={{ fontSize: 16, lineHeight: 25 }}>
          {props.description ?? 'A presenter creating cultural experiences for the community.'}
        </Text>
      </View>
      {props.videoUrl ? (
        <Pressable
          onPress={() => Linking.openURL(props.videoUrl!)}
          style={{ aspectRatio: 16 / 9, borderRadius: radius.xl, overflow: 'hidden' }}
        >
          <Image
            source={{ uri: hero }}
            contentFit="cover"
            style={{ position: 'absolute', inset: 0 }}
          />
          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(4,9,14,.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text color="#101b24" style={{ fontSize: 25 }}>
                ▶
              </Text>
            </View>
          </View>
          <Text
            variant="label"
            color="#fff"
            style={{ position: 'absolute', left: spacing.md, bottom: spacing.md }}
          >
            MEET THE PRESENTER
          </Text>
        </Pressable>
      ) : null}
      {props.address || props.websiteUrl || props.videoUrl || props.coordinates ? (
        <Card variant="tinted" style={{ gap: spacing.md }}>
          <Text variant="heading">Venue details</Text>
          {props.address ? (
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <MapPinIcon color={String(theme.colors.primary)} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="bodyBold">Address</Text>
                <Text muted>{props.address}</Text>
              </View>
            </View>
          ) : null}
          {props.coordinates ? (
            <View style={{ gap: 2 }}>
              <Text variant="bodyBold">Map location</Text>
              <Text muted>
                {props.coordinates.latitude.toFixed(4)}, {props.coordinates.longitude.toFixed(4)}
              </Text>
            </View>
          ) : null}
          {props.websiteUrl ? (
            <View style={{ gap: 2 }}>
              <Text variant="bodyBold">Website</Text>
              <Text color={theme.colors.primary}>{props.websiteUrl}</Text>
            </View>
          ) : null}
          {props.videoUrl ? (
            <View style={{ gap: 2 }}>
              <Text variant="bodyBold">Video</Text>
              <Text color={theme.colors.primary} numberOfLines={1}>
                {props.videoUrl}
              </Text>
            </View>
          ) : null}
        </Card>
      ) : null}
      <View style={{ gap: spacing.md }}>
        <Text variant="heading">Upcoming events</Text>
        {props.events.length ? (
          <EventCarousel events={props.events} />
        ) : (
          <Card>
            <Text variant="bodyBold">More dates are coming</Text>
            <Text variant="caption" muted>
              Follow to see new events from this presenter.
            </Text>
          </Card>
        )}
      </View>
    </View>
  );
}
