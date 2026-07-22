import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { ChevronLeftIcon, ChevronRightIcon } from '../layout/icons/MenuIcons';
import { Text } from '../ui';

const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_LABELS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

// Matches web's hardcoded range-picker colors (app/calendar/events/components/date-sort-filter-controls.tsx:242,275) exactly — not theme tokens, since web itself hardcodes these hex values in both light and dark.
const RANGE_MIDDLE_BG = '#D8ECFA';
const RANGE_MIDDLE_TEXT = '#1F4F73';

function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

interface MonthCalendarProps {
  /** Range start (or the only selected date, if rangeEnd is null). */
  selectedDate: string | null;
  /** Range end — when set, dates between selectedDate and rangeEnd render as connected "range middle" cells, mirroring web's DayPicker range mode. */
  rangeEnd?: string | null;
  onSelectDate: (isoDate: string) => void;
}

/**
 * Manual month-grid calendar (no calendar library installed on mobile) —
 * mirrors the real range-selection behavior in web's
 * app/calendar/events/components/date-sort-filter-controls.tsx
 * (handleSelectRangeDate, lines 152-182): first tap sets the range start,
 * second tap sets the end (or restarts the range if the new tap is before
 * the current start); past dates are disabled. Today gets its own outline
 * independent of selection state (web's `today` classNames slot).
 */
export function MonthCalendar({ selectedDate, rangeEnd, onSelectDate }: MonthCalendarProps) {
  const theme = useAppTheme();
  const today = startOfToday();
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const rangeStartDate = selectedDate ? parseIso(selectedDate) : null;
  const rangeEndDate = rangeEnd ? parseIso(rangeEnd) : null;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
        <Pressable
          accessibilityLabel="Previous month"
          hitSlop={8}
          onPress={() => setViewDate(new Date(year, month - 1, 1))}
        >
          <ChevronLeftIcon color={String(theme.colors.text)} size={18} />
        </Pressable>
        <Text variant="label">
          {MONTH_LABELS[month]} {year}
        </Text>
        <Pressable
          accessibilityLabel="Next month"
          hitSlop={8}
          onPress={() => setViewDate(new Date(year, month + 1, 1))}
        >
          <ChevronRightIcon color={String(theme.colors.text)} size={18} />
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {WEEKDAY_LABELS.map((label) => (
          <View key={label} style={{ flex: 1, alignItems: 'center' }}>
            <Text variant="caption" muted>
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.xs }}>
        {cells.map((date, i) => {
          if (!date) {
            return <View key={`empty-${i}`} style={{ width: `${100 / 7}%`, aspectRatio: 1 }} />;
          }
          const iso = toIsoDate(date);
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isRangeStart = rangeStartDate?.getTime() === date.getTime();
          const isRangeEnd = rangeEndDate?.getTime() === date.getTime();
          const isRangeMiddle =
            !!rangeStartDate && !!rangeEndDate && date > rangeStartDate && date < rangeEndDate;
          const isEndpoint = isRangeStart || isRangeEnd;

          return (
            <View key={iso} style={{ width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={iso}
                disabled={isPast}
                onPress={() => onSelectDate(iso)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: isRangeMiddle ? radius.sm : radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isEndpoint ? palette.blue : isRangeMiddle ? RANGE_MIDDLE_BG : 'transparent',
                  borderWidth: isToday && !isEndpoint ? 1.5 : 0,
                  borderColor: palette.blue,
                }}
              >
                <Text
                  variant="body"
                  style={{ opacity: isPast ? 0.5 : 1 }}
                  color={isEndpoint ? '#ffffff' : isRangeMiddle ? RANGE_MIDDLE_TEXT : isPast ? theme.colors.textMuted : theme.colors.text}
                >
                  {date.getDate()}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}
