/**
 * Filter drawer — full-screen (per reference screenshot), collapsible Date
 * and Category sections, mirrors the field semantics of
 * app/calendar/events/components/date-sort-filter-controls.tsx and
 * app/calendar/events/components/event-filters.tsx on web (UPPERCASE
 * DateFilterType enum values, same genre tagIds). "Tomorrow" is not a real
 * backend DateFilterType — it's a derived client-side quick-pick that sets
 * customDate to today+1 (see types/filters.ts), matching the reference
 * screenshot without inventing a fake backend enum value. Range selection
 * (customDate → customDateEnd) mirrors web's handleSelectRangeDate exactly:
 * first tap sets the start, second tap sets the end (or restarts the range
 * if the new tap is before the current start).
 */
import { useState } from 'react';
import { Image } from 'expo-image';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMainGenres } from '../../queries/genres.queries';
import { palette } from '../../design/colors';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventFiltersState } from '../../types/filters';
import { Text } from '../ui';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { ChevronDownIcon, XIcon } from '../layout/icons/MenuIcons';
import { MonthCalendar } from './MonthCalendar';

interface FilterPanelProps {
  visible: boolean;
  onClose: () => void;
  filters: EventFiltersState;
  onChange: (filters: EventFiltersState) => void;
  /** Which section the accordion should open on — set by which filter pill triggered this panel. Defaults to 'date'. */
  initialSection?: 'date' | 'category';
}

function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function tomorrowIso(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return toIsoDate(d);
}

interface SectionHeaderProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
}

function SectionHeader({ title, expanded, onToggle }: SectionHeaderProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onToggle}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
      }}
    >
      <Text variant="subheading">{title}</Text>
      <View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
        <ChevronDownIcon color={String(theme.colors.text)} size={18} />
      </View>
    </Pressable>
  );
}

export function FilterPanel({ visible, onClose, filters, onChange, initialSection = 'date' }: FilterPanelProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data: genres } = useMainGenres();
  // Accordion — only one section open at a time, so opening Category closes Date and vice versa.
  const [expandedSection, setExpandedSection] = useState<'date' | 'category'>(initialSection);
  // The Modal is mounted persistently, so expandedSection wouldn't otherwise
  // reset when re-opened — adjusting state during render (React's documented
  // pattern for this, https://react.dev/learn/you-might-not-need-an-effect)
  // makes it reflect whichever pill was tapped (e.g. Search screen's separate
  // Date/Category pills) every time the panel opens, without an effect.
  const [prevVisible, setPrevVisible] = useState(visible);
  if (visible !== prevVisible) {
    setPrevVisible(visible);
    if (visible) setExpandedSection(initialSection);
  }
  const dateExpanded = expandedSection === 'date';
  const categoryExpanded = expandedSection === 'category';

  const toggleGenre = (genreId: string) => {
    onChange({
      ...filters,
      tagIds: filters.tagIds.includes(genreId)
        ? filters.tagIds.filter((id) => id !== genreId)
        : [...filters.tagIds, genreId],
    });
  };

  const selectQuickDate = (value: 'TODAY' | 'THIS_WEEKEND') => {
    onChange({ ...filters, dateFilter: filters.dateFilter === value ? '' : value, customDate: null, customDateEnd: null });
  };

  const selectTomorrow = () => {
    const iso = tomorrowIso();
    onChange({
      ...filters,
      dateFilter: '',
      customDate: filters.customDate === iso ? null : iso,
      customDateEnd: null,
    });
  };

  // Mirrors web's handleSelectRangeDate (date-sort-filter-controls.tsx:152-182).
  const selectCalendarDate = (iso: string) => {
    const tapped = new Date(iso);
    const hasCompleteRange = filters.customDate && filters.customDateEnd;

    if (!filters.customDate || hasCompleteRange) {
      onChange({ ...filters, dateFilter: '', customDate: iso, customDateEnd: null });
      return;
    }

    const start = new Date(filters.customDate);
    if (tapped.getTime() < start.getTime()) {
      onChange({ ...filters, dateFilter: '', customDate: iso, customDateEnd: null });
      return;
    }
    if (tapped.getTime() === start.getTime()) {
      onChange({ ...filters, dateFilter: '', customDate: null, customDateEnd: null });
      return;
    }
    onChange({ ...filters, dateFilter: '', customDateEnd: iso });
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="fullScreen">
      <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: insets.top }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
          }}
        >
          <Pressable accessibilityLabel="Close filters" hitSlop={8} onPress={onClose}>
            <XIcon color={String(theme.colors.text)} size={22} />
          </Pressable>
          <Text variant="heading">Filters</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 120 }}
        >
          <SectionHeader title="Date" expanded={dateExpanded} onToggle={() => setExpandedSection('date')} />
          {dateExpanded ? (
            <View style={{ marginBottom: spacing.lg }}>
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
                <Chip label="Today" active={filters.dateFilter === 'TODAY'} onPress={() => selectQuickDate('TODAY')} />
                <Chip label="Tomorrow" active={filters.customDate === tomorrowIso() && !filters.customDateEnd} onPress={selectTomorrow} />
                <Chip
                  label="This weekend"
                  active={filters.dateFilter === 'THIS_WEEKEND'}
                  onPress={() => selectQuickDate('THIS_WEEKEND')}
                />
              </View>
              <MonthCalendar
                selectedDate={filters.customDate}
                rangeEnd={filters.customDateEnd}
                onSelectDate={selectCalendarDate}
              />
            </View>
          ) : null}

          <View style={{ height: 1, backgroundColor: theme.colors.border, marginBottom: spacing.sm }} />

          <SectionHeader title="Category" expanded={categoryExpanded} onToggle={() => setExpandedSection('category')} />
          {categoryExpanded ? (
            <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
              {(genres ?? []).map((genre) => {
                const active = filters.tagIds.includes(genre.id);
                return (
                  <Pressable
                    key={genre.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => toggleGenre(genre.id)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: spacing.md,
                      padding: spacing.sm,
                      borderRadius: radius.lg,
                      borderWidth: active ? 2 : 1,
                      borderColor: active ? palette.blue : theme.colors.border,
                      backgroundColor: active ? theme.colors.chipActiveBackground : theme.colors.surface,
                      opacity: pressed ? 0.85 : 1,
                    })}
                  >
                    <Image
                      source={{ uri: genre.iconUrl ?? `https://picsum.photos/seed/${genre.id}/120/120` }}
                      style={{ width: 48, height: 48, borderRadius: radius.md, backgroundColor: theme.colors.skeleton }}
                      contentFit="cover"
                    />
                    <Text variant="bodyBold" style={{ flex: 1 }}>
                      {genre.display}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: spacing.lg,
            paddingBottom: insets.bottom + spacing.md,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <Button label="Apply" fullWidth onPress={onClose} style={{ borderRadius: radius.full }} />
        </View>
      </View>
    </Modal>
  );
}
