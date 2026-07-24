/**
 * Shared component-size tokens — not spacing (gaps/padding) or radius, but
 * fixed dimensions reused across components that should visually match.
 */
export const sizes = {
  /** Row-card thumbnail (image left, text right) — SearchResultRow, and the
   * 'row' variant of VenueCard/RestaurantCard/OrganizationCard/FavoriteRow.
   * These must all match; don't hardcode this value per-component. */
  rowThumbnail: 128,
} as const;
