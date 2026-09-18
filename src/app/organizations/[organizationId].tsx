import { useLocalSearchParams } from 'expo-router';
import { PresenterProfile } from '../../components/presenters/PresenterProfile';
import { ErrorState, LoadingState, Screen } from '../../components/ui';
import { useEventsFeed } from '../../queries/events.queries';
import { useOrganization } from '../../queries/organizations.queries';
import type { OrganizationRouteParams } from '../../types/navigation';
export default function OrganizationRoute() {
  const { organizationId } = useLocalSearchParams<OrganizationRouteParams>();
  const { data: org, isLoading, isError, refetch } = useOrganization(organizationId);
  const { data: feed } = useEventsFeed({});
  if (isLoading)
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  if (isError || !org)
    return (
      <Screen>
        <ErrorState message="We couldn’t load this organization." onRetry={() => refetch()} />
      </Screen>
    );
  const events = (feed?.events ?? []).filter((e) =>
    e.tags.some((t) => org.genres.includes(t.name)),
  );
  return (
    <Screen scroll>
      <PresenterProfile
        kind="Arts group"
        name={org.name}
        location={org.city}
        imageUrl={org.imageUrl}
        description={org.description}
        category={org.genres[0]}
        address={org.address}
        websiteUrl={org.websiteUrl}
        videoUrl={org.videoUrl}
        socialLinks={org.socialLinks}
        events={events}
      />
    </Screen>
  );
}
