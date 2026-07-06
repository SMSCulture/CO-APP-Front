import type { EventDateSlot } from '../types/event';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** "Sat, Jul 18" */
export function formatEventDate(iso: string): string {
  const date = parseISODate(iso);
  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

/** "8:00 PM" from "20:00" */
export function formatTime(time: string | null): string {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** "Sat, Jul 18 · 8:00 PM" */
export function formatDateSlot(slot: EventDateSlot | null, fallbackDate?: string): string {
  if (!slot) return fallbackDate ? formatEventDate(fallbackDate) : 'Dates TBA';
  const time = formatTime(slot.startTime);
  return time ? `${formatEventDate(slot.date)} · ${time}` : formatEventDate(slot.date);
}

/** { day: "18", month: "JUL" } for date badges. */
export function formatDateBadge(iso: string): { day: string; month: string } {
  const date = parseISODate(iso);
  return { day: String(date.getDate()), month: MONTHS[date.getMonth()].toUpperCase() };
}
