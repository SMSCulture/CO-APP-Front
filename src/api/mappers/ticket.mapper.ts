/**
 * Placeholder mapper for purchased tickets. The consumer ticketing API does
 * not exist yet — when it lands, map its payload to PurchasedTicket here so
 * screens keep working unchanged. See docs/api-contract-notes.md.
 */
import type { PurchasedTicket } from '../../types/ticket';

export function mapRawTicket(raw: PurchasedTicket): PurchasedTicket {
  return raw;
}
