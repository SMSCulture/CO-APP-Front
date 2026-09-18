import { useLocalSearchParams } from 'expo-router';
import { PresenterProfile } from '../../components/presenters/PresenterProfile';
import { ErrorState, LoadingState, Screen } from '../../components/ui';
import { mockEventSummaries } from '../../mock/events.mock';
import { useVenue } from '../../queries/venues.queries';
import type { VenueRouteParams } from '../../types/navigation';
export default function VenueRoute() {
  const { venueId } = useLocalSearchParams<VenueRouteParams>();
  const { data: v, isLoading, isError, refetch } = useVenue(venueId);
  if (isLoading)
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  if (isError || !v)
    return (
      <Screen>
        <ErrorState message="We couldn’t load this venue." onRetry={() => refetch()} />
      </Screen>
    );
  const events = mockEventSummaries.filter((e) => e.venue?.id === v.id);
  return (
    <Screen scroll>
      <PresenterProfile
        kind="Venue"
        name={v.name}
        location={`${v.city}, ${v.state}`}
        imageUrl={v.imageUrl}
        description={v.description}
        category={v.venueType}
        address={v.address}
        websiteUrl={v.websiteUrl}
        videoUrl={v.videoUrl}
        events={events}
      />
    </Screen>
  );
}
