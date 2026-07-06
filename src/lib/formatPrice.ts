import type { EventSummary } from '../types/event';

/** "Free", "$35 – $120", or "See tickets". */
export function formatEventPrice(event: Pick<EventSummary, 'free' | 'pricing'>): string {
  if (event.free) return 'Free';
  return event.pricing ?? 'See tickets';
}

/** "From $35" derived from a pricing range string, or "Free". */
export function formatFromPrice(event: Pick<EventSummary, 'free' | 'pricing'>): string {
  if (event.free) return 'Free';
  const match = event.pricing?.match(/\$\s?(\d+(?:\.\d{2})?)/);
  return match ? `From $${match[1]}` : 'See tickets';
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
