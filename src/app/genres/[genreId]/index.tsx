import { useLocalSearchParams } from 'expo-router';
import { GenreLandingScreen } from '../../../features/genres/GenreLandingScreen';
export default function GenrePage() { const { genreId } = useLocalSearchParams<{ genreId: string }>(); return <GenreLandingScreen genreId={genreId} />; }
