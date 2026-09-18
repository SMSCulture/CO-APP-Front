import { useLocalSearchParams } from 'expo-router';

import { NewsCategoryScreen } from '../../../features/news/NewsCategoryScreen';

export default function NewsCategoryRoute() {
  const { category, collection } = useLocalSearchParams<{ category: string; collection?: string }>();
  return (
    <NewsCategoryScreen
      category={decodeURIComponent(category)}
      collection={collection}
    />
  );
}
