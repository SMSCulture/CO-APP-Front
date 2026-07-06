import { useQuery } from '@tanstack/react-query';

import { fetchMyTickets, fetchTicket } from '../api/modules/tickets.api';

export function useMyTickets(enabled: boolean) {
  return useQuery({
    queryKey: ['tickets', 'mine'] as const,
    queryFn: fetchMyTickets,
    enabled,
  });
}

export function useTicket(ticketId: string) {
  return useQuery({
    queryKey: ['tickets', 'detail', ticketId] as const,
    queryFn: () => fetchTicket(ticketId),
    enabled: Boolean(ticketId),
  });
}
