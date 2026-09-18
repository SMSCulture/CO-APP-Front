import { Image } from 'expo-image';
import { Linking, Modal, Pressable, View } from 'react-native';
import { useState } from 'react';
import { AppHeader } from '../layout/AppHeader';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Button, Card, Text } from '../ui';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventSummary } from '../../types/event';
import { EventCarousel } from '../discovery/EventCarousel';
import { InlineVideo } from './InlineVideo';

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
  socialLinks?: { label: string; url: string }[];
  events: EventSummary[];
}

export function PresenterProfile(props: PresenterProfileProps) {
  const theme = useAppTheme();
  const [socialsOpen, setSocialsOpen] = useState(false);
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
      {props.socialLinks?.length ? (
        <View style={{ alignItems: 'flex-start', gap: spacing.sm }}>
          <Text variant="label" muted>FOLLOW</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${props.name} social links`}
            onPress={() => setSocialsOpen(true)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              minHeight: 46,
              borderRadius: 23,
              paddingHorizontal: spacing.lg,
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              opacity: pressed ? 0.65 : 1,
            })}
          >
            <Text style={{ fontSize: 19 }}>◎</Text>
            <Text variant="bodyBold">Social links</Text>
            <Text muted>↗</Text>
          </Pressable>
          <Modal visible={socialsOpen} transparent animationType="slide" onRequestClose={() => setSocialsOpen(false)}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(3,8,13,.58)' }}>
              <Pressable accessibilityLabel="Close social links" style={{ flex: 1 }} onPress={() => setSocialsOpen(false)} />
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  padding: spacing.xl,
                  paddingBottom: 48,
                  gap: spacing.lg,
                }}
              >
                <View style={{ width: 42, height: 4, borderRadius: 2, alignSelf: 'center', backgroundColor: theme.colors.border }} />
                <View style={{ gap: 3 }}>
                  <Text variant="title">Follow {props.name}</Text>
                  <Text muted>Choose a channel. It opens in its app or website.</Text>
                </View>
                {props.socialLinks.map((social) => (
                  <Pressable
                    key={social.label}
                    accessibilityRole="link"
                    onPress={() => Linking.openURL(social.url)}
                    style={({ pressed }) => ({
                      minHeight: 56,
                      borderRadius: radius.lg,
                      paddingHorizontal: spacing.lg,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: theme.colors.surface,
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      opacity: pressed ? 0.65 : 1,
                    })}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                      <Text style={{ fontSize: 20 }}>◎</Text>
                      <Text variant="bodyBold">{social.label}</Text>
                    </View>
                    <Text color={theme.colors.primary}>Open ↗</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
      {props.videoUrl ? (
        <View style={{ gap: spacing.sm }}>
          <Text variant="heading">Watch</Text>
          <InlineVideo url={props.videoUrl} title={`Video from ${props.name}`} />
        </View>
      ) : null}
      {props.address || props.websiteUrl ? (
        <Card variant="tinted" style={{ gap: spacing.md }}>
          <Text variant="heading">{props.kind === 'Venue' ? 'Venue details' : 'Organization details'}</Text>
          {props.address ? (
            <View style={{ flexDirection: 'row', gap: spacing.md }}>
              <MapPinIcon color={String(theme.colors.primary)} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="bodyBold">Address</Text>
                <Text muted>{props.address}</Text>
              </View>
            </View>
          ) : null}
          {props.websiteUrl ? (
            <View style={{ gap: 2 }}>
              <Text variant="bodyBold">Website</Text>
              <Text color={theme.colors.primary}>{props.websiteUrl}</Text>
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
