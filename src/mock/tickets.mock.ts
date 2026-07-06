import type { PurchasedTicket } from '../types/ticket';

export const mockTickets: PurchasedTicket[] = [
  {
    id: 'tkt-1',
    eventId: 'evt-1',
    eventTitle: 'Miami Symphony: Beethoven Under the Stars',
    eventImageUrl: 'https://picsum.photos/seed/symphony/1200/800',
    venueName: 'Bayfront Park Amphitheater',
    city: 'Miami',
    date: '2026-07-18',
    startTime: '20:00',
    quantity: 2,
    totalPrice: 70,
    currency: 'USD',
    status: 'UPCOMING',
    qrPayload: 'CO-TKT-1-MOCK',
  },
  {
    id: 'tkt-2',
    eventId: 'evt-4',
    eventTitle: 'Little Havana Food & Culture Tour',
    eventImageUrl: 'https://picsum.photos/seed/havana/1200/800',
    venueName: 'Calle Ocho',
    city: 'Miami',
    date: '2026-06-14',
    startTime: '11:00',
    quantity: 1,
    totalPrice: 59,
    currency: 'USD',
    status: 'USED',
    qrPayload: 'CO-TKT-2-MOCK',
  },
];
