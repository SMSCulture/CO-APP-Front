import type { EventSummary } from '../types/event';

/** "Free", "$35 – $120", or "See tickets". */
export function formatEventPrice(event: Pick<EventSummary, 'free' | 'pricing'>): string {
  if (event.free) return 'Free';
  return event.pricing ?? 'See tickets';
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
