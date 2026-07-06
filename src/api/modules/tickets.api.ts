/**
 * Purchased tickets — MOCK ONLY. The backend's ticket module is support
 * tickets; consumer ticket purchases (flat-fee ticketing) have no API yet.
 * Replace the mock branch when the backend exposes myPurchasedTickets.
 * Contract proposal lives in docs/api-contract-notes.md.
 */
import { mockTickets } from '../../mock/tickets.mock';
import type { PurchasedTicket } from '../../types/ticket';

export async function fetchMyTickets(): Promise<PurchasedTicket[]> {
  return mockTickets;
}

export async function fetchTicket(ticketId: string): Promise<PurchasedTicket> {
  const ticket = mockTickets.find((t) => t.id === ticketId);
  if (!ticket) throw new Error(`Ticket not found: ${ticketId}`);
  return ticket;
}
