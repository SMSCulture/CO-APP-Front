import { GENRES } from '../../config/constants';
import { HorizontalCarousel } from '../layout/HorizontalCarousel';
import { Chip } from '../ui';

interface CategoryChipsProps {
  selected: string | null;
  onSelect: (genreId: string | null) => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <HorizontalCarousel>
      <Chip label="All" active={selected === null} onPress={() => onSelect(null)} />
      {GENRES.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          active={selected === genre.id}
          onPress={() => onSelect(selected === genre.id ? null : genre.id)}
        />
      ))}
    </HorizontalCarousel>
  );
}
