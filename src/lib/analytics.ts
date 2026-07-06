/**
 * Analytics placeholder — mirrors the web frontend's dataLayer approach.
 * Wire to GTM/GA4 (or a mobile analytics SDK) later; call sites stay stable.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (__DEV__) {
    console.log(`[analytics] ${name}`, params);
  }
}

export function trackScreen(screenName: string): void {
  trackEvent('screen_view', { screen_name: screenName });
}
