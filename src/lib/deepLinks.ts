/**
 * Deep link helpers for the `cultureowl://` scheme (see app.json).
 * Web URLs map 1:1: cultureowl.com/events/<slug> → cultureowl://events/<slug>.
 */
export const deepLinkRoutes = {
  event: (idOrSlug: string) => `/events/${idOrSlug}`,
  venue: (idOrSlug: string) => `/venues/${idOrSlug}`,
  organization: (idOrSlug: string) => `/organizations/${idOrSlug}`,
  checkout: (eventId: string) => `/checkout/${eventId}`,
} as const;
