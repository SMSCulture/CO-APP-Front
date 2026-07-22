import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

interface IconProps {
  color: string;
  size?: number;
}

/** Matches lucide's Building icon — same one web uses for Venues (components/layout/user-menu.tsx, discover-menu.tsx). */
export function BuildingIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={2} width={16} height={20} rx={1} stroke={color} strokeWidth={2} />
      <Line x1={9} y1={6} x2={9} y2={6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={15} y1={6} x2={15} y2={6} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={9} y1={10} x2={9} y2={10} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={15} y1={10} x2={15} y2={10} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={9} y1={14} x2={9} y2={14} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={15} y1={14} x2={15} y2={14} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M10 22v-4h4v4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Matches lucide's Newspaper icon — web uses this for Cultural News. */
export function NewspaperIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4h13a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M18 8h2a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={8} y1={8} x2={13} y2={8} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={12} x2={13} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={16} x2={13} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function MapPinIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={12} cy={10} r={2.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/** Lucide's actual Heart path — same shape used in HeartButton.tsx's filled version. */
export function HeartIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function StarIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.8-4.6 6.6-.9 2.9-6Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TicketIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.2a1.8 1.8 0 0 0 0 3.6V14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.2a1.8 1.8 0 0 0 0-3.6V8Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Line x1={13} y1={6.5} x2={13} y2={8} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={13} y1={11} x2={13} y2={13} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={13} y1={15} x2={13} y2={16.5} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function HelpIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.8.3-1.4 1-1.4 1.9v.3" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={17} x2={12} y2={17} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function MapIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Line x1={9} y1={4} x2={9} y2={18} stroke={color} strokeWidth={2} />
      <Line x1={15} y1={6} x2={15} y2={20} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/** Replaces the "⌄" text glyph (font-rendering-dependent, looked odd) next to the city name in AppHeader/HomeHeader. */
export function ChevronDownIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Replaces the "‹" text glyph used for back buttons (DetailScreenHeader, event/article detail screens). */
export function ChevronLeftIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Close ("X") icon — used for the full-screen filter drawer's close button. */
export function XIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6 6 18M6 6l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Same path as ChevronLeftIcon, mirrored — used for the calendar's month-forward nav. */
export function ChevronRightIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Real gear icon — replaces the tiny "⚙" text glyph (font-rendering-dependent, was rendering small/rough). */
export function GearIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Matches lucide's Utensils icon — same one web uses for Restaurants (components/layout/discover-menu.tsx). */
export function RestaurantIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M7 2v20M11 2v7a4 4 0 0 0 4 4v7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
