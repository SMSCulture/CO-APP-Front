import { useLocalSearchParams } from 'expo-router';

import { NewsCategoryScreen } from '../../../features/news/NewsCategoryScreen';

export default function NewsCategoryRoute() {
  const { category } = useLocalSearchParams<{ category: string }>();
  return <NewsCategoryScreen category={decodeURIComponent(category)} />;
}
