/** Non-sensitive key/value storage (theme mode, city, onboarding flags). */
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredValue(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function setStoredValue(key: string, value: string): Promise<void> {
  await AsyncStorage.setItem(key, value).catch(() => {});
}

export async function removeStoredValue(key: string): Promise<void> {
  await AsyncStorage.removeItem(key).catch(() => {});
}
