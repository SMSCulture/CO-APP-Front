import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { View } from 'react-native';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventMapPin } from '../../types/map';
import { EventMapMarker } from './EventMapMarker';

interface EventMapProps { pins: EventMapPin[]; selectedEventId: string | null; onSelectPin: (eventId: string) => void; }

/** Lightweight illustrated city surface used until native map tiles are connected. Pins already use real coordinates. */
export function EventMap({ pins, selectedEventId, onSelectPin }: EventMapProps) {
  const theme = useAppTheme();
  const lats = pins.map((p) => p.coordinate.latitude); const lngs = pins.map((p) => p.coordinate.longitude);
  const minLat = Math.min(...lats); const maxLat = Math.max(...lats); const minLng = Math.min(...lngs); const maxLng = Math.max(...lngs);
  const project = (pin: EventMapPin) => ({ leftPct: maxLng === minLng ? 50 : 7 + ((pin.coordinate.longitude - minLng) / (maxLng - minLng)) * 78, topPct: maxLat === minLat ? 50 : 12 + ((maxLat - pin.coordinate.latitude) / (maxLat - minLat)) * 68 });
  return <View style={{ flex: 1, backgroundColor: theme.colors.surface, overflow: 'hidden' }}>
    <Svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="none" style={{ position: 'absolute' }}>
      <Rect width="390" height="844" fill="#eef3f2" />
      <Path d="M-20 175 C80 130 130 220 220 170 S350 110 430 150" stroke="#cbd9d6" strokeWidth="18" fill="none" />
      <Path d="M30 0 C80 165 35 250 85 420 S150 690 120 860 M220 -20 C190 170 280 260 235 470 S240 690 300 860" stroke="#d9e2df" strokeWidth="7" fill="none" />
      <Path d="M0 330 L390 265 M0 515 L390 575 M0 690 L390 640" stroke="#d9e2df" strokeWidth="6" />
      <Rect x="135" y="250" width="72" height="48" rx="9" fill="#d8e9d4" /><Rect x="250" y="585" width="86" height="62" rx="9" fill="#d8e9d4" />
      <Circle cx="195" cy="400" r="18" fill="#d8e9d4" /><Path d="M0 800 C100 720 280 790 390 710 L390 844 L0 844 Z" fill="#d8e9f2" />
    </Svg>
    {pins.map((pin) => <EventMapMarker key={pin.eventId} pin={pin} position={project(pin)} selected={pin.eventId === selectedEventId} onPress={() => onSelectPin(pin.eventId)} />)}
  </View>;
}
