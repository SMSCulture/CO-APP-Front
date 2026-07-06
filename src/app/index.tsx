import { Redirect } from 'expo-router';

/**
 * Entry: guests land on the tabs directly (discovery-first, like the web).
 * The welcome flow lives at /(public)/welcome for first-run and sign-in.
 */
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
