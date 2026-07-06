/**
 * Purchased event tickets. NOTE: the backend does not expose consumer ticket
 * purchases yet (lib/graphql/tickets.ts on web is SUPPORT tickets). This is
 * the proposed contract for the flat-fee ticketing API — mock-only for now.
 * See docs/api-contract-notes.md.
 */
export type TicketStatus = 'UPCOMING' | 'USED' | 'EXPIRED' | 'CANCELLED';

export interface PurchasedTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImageUrl: string | null;
  venueName: string;
  city: string;
  date: string; // ISO
  startTime: string | null;
  quantity: number;
  totalPrice: number;
  currency: 'USD';
  status: TicketStatus;
  qrPayload: string;
}
