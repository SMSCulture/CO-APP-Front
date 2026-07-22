import Svg, { Circle, Path } from 'react-native-svg';

interface IconProps {
  color: string;
  size: number;
}

/** Exact SVG provided by the user (magnifying glass, viewBox 60x60). */
export function SearchTabIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.49994 24.5002C7.49994 15.1114 15.1111 7.50024 24.4999 7.50024C33.8888 7.50024 41.4999 15.1114 41.4999 24.5002C41.4999 33.8891 33.8888 41.5002 24.4999 41.5002C15.1111 41.5002 7.49994 33.8891 7.49994 24.5002ZM24.4999 1.50024C11.7974 1.50024 1.49994 11.7977 1.49994 24.5002C1.49994 37.2028 11.7974 47.5002 24.4999 47.5002C29.4066 47.5002 33.9545 45.9638 37.6885 43.3457L51.6715 57.3287C53.2336 58.8908 55.7663 58.8908 57.3284 57.3287C58.8905 55.7666 58.8905 53.2339 57.3284 51.6718L43.3454 37.6889C45.9635 33.9548 47.4999 29.4069 47.4999 24.5002C47.4999 11.7977 37.2025 1.50024 24.4999 1.50024Z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * Custom outline icons (not yet from the Untitled UI Figma set — that link
 * was a community-file overview page, not a node-specific URL, so exact
 * assets couldn't be pulled). Swap these for real exports by sending a
 * node-specific figma.com/design/... URL for each icon.
 */

export function HomeTabIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 11L12 3L21 11" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DiscoverTabIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Path d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z" fill={color} stroke={color} strokeWidth={0.5} strokeLinejoin="round" />
    </Svg>
  );
}

export function TicketTabIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.2a1.8 1.8 0 0 0 0 3.6V14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.2a1.8 1.8 0 0 0 0-3.6V8Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M13 6.5v1.5M13 11v2M13 15v1.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ProfileTabIcon({ color, size }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
