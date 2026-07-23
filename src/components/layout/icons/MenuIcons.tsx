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

/** Small selected-state mark — used instead of full-row highlighting for single-select lists (e.g. FilterPanel's category list). */
export function CheckIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6 9 17l-5-5" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
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

/**
 * Real gear icon — replaces the tiny "⚙" text glyph (font-rendering-dependent,
 * was rendering small/rough). `filled` renders Material's solid "settings"
 * glyph (Profile's settings trigger) instead of the outline — the earlier
 * attempt just filled the thin outline path, which collapsed into an
 * unreadable blob at small sizes since that path was never designed as a
 * fillable region.
 */
export function GearIcon({ color, size = 20, filled = false }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={color}
          d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 0 0-.48-.41h-3.84a.5.5 0 0 0-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.5.5 0 0 0-.59.22L2.74 8.87a.5.5 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.03.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58ZM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2Z"
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/** Simple pencil/edit icon — Profile's "Edit Profile" entry point. */
export function EditIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
        stroke={color}
        strokeWidth={2}
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

/** Matches lucide's Bell icon — Settings' "Notifications" toggle row. */
export function BellIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Matches lucide's Mail icon — Settings' "Email" toggle row. */
export function MailIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={4} width={20} height={16} rx={2} stroke={color} strokeWidth={2} />
      <Path d="m2 7 10 6 10-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Matches lucide's Shield icon — Settings' "Legal" section (Terms/Privacy). */
export function ShieldIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Matches lucide's FileText icon — Settings' "Terms & Conditions" row. */
export function FileTextIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M14 2v6h6" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Line x1={8} y1={13} x2={16} y2={13} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={17} x2={16} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Matches lucide's CreditCard icon — Settings' "Delete Payment Methods" row. */
export function CreditCardIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={5} width={20} height={14} rx={2} stroke={color} strokeWidth={2} />
      <Line x1={2} y1={10} x2={22} y2={10} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/** Matches lucide's Trash2 icon — Settings' "Delete Account" row. */
export function TrashIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1={10} y1={11} x2={10} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={14} y1={11} x2={14} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Matches lucide's LogOut icon — Settings' "Logout" row. */
export function LogoutIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m16 17 5-5-5-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={21} y1={12} x2={9} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Matches lucide's Search icon — Help Center's article search box. */
export function SearchIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Line x1={21} y1={21} x2={16.65} y2={16.65} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Matches lucide's MessageCircle icon — Contact Us' "Live Chat" option. */
export function ChatIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.2 0-2.35-.27-3.37-.76L3 21l1.3-5.24A8.5 8.5 0 1 1 21 12Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Matches lucide's Phone icon — Contact Us' "Call Us" option. */
export function PhoneIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Simplified WhatsApp glyph — Contact Us' "WhatsApp" option (temporary channel, per explicit "for now"). */
export function WhatsAppIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 8.3c.2-.5.4-.5.6-.5h.5c.16 0 .37 0 .5.4.2.5.6 1.6.65 1.7.05.1.08.23 0 .37-.06.15-.1.24-.2.37-.1.13-.22.29-.31.39-.1.1-.2.2-.1.4.4.7.8 1.3 1.4 1.8.6.5 1.1.7 1.3.8.2.1.32.08.44-.05.13-.13.5-.58.63-.78.13-.2.26-.16.44-.1.18.07 1.1.53 1.3.62.2.1.33.15.38.23.05.1.05.55-.13 1.08-.18.53-1.03.98-1.44 1.04-.37.06-.83.08-1.34-.08-.3-.1-.7-.23-1.2-.46-2.1-.9-3.47-3-3.58-3.14-.1-.15-.86-1.14-.86-2.18 0-1.04.55-1.55.74-1.76Z"
        fill={color}
      />
    </Svg>
  );
}
