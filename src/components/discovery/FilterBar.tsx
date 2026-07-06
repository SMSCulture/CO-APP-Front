import { CITIES } from '../../config/constants';
import { HorizontalCarousel } from '../layout/HorizontalCarousel';
import { Chip } from '../ui';

interface FilterBarProps {
  city: string;
  onCityChange: (city: string) => void;
}

/** City filter row, mirroring the web frontend's city switcher. */
export function FilterBar({ city, onCityChange }: FilterBarProps) {
  return (
    <HorizontalCarousel>
      {CITIES.map((c) => (
        <Chip key={c} label={c} active={city === c} onPress={() => onCityChange(c)} />
      ))}
    </HorizontalCarousel>
  );
}
