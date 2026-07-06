import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useEventsFeed } from '../../queries/events.queries';
import { useOrganization } from '../../queries/organizations.queries';
import type { OrganizationRouteParams } from '../../types/navigation';

export default function OrganizationRoute() {
  const { organizationId } = useLocalSearchParams<OrganizationRouteParams>();
  const { data: org, isLoading, isError, refetch } = useOrganization(organizationId);
  const { data: feed } = useEventsFeed({});

  if (isLoading) {
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  }
  if (isError || !org) {
    return (
      <Screen>
        <ErrorState message="We couldn’t load this organization." onRetry={() => refetch()} />
      </Screen>
    );
  }

  const orgEvents = (feed?.events ?? []).filter((e) =>
    e.tags.some((t) => org.genres.includes(t.name)),
  );

  return (
    <Screen scroll>
      <AppHeader title={org.name} subtitle={org.city} />
      <View style={{ gap: spacing.lg }}>
        {org.description ? <Text muted>{org.description}</Text> : null}
        <SectionHeader title="Upcoming events" />
        {orgEvents.length > 0 ? (
          <EventCarousel events={orgEvents} />
        ) : (
          <Text muted>No upcoming events listed.</Text>
        )}
      </View>
    </Screen>
  );
}
