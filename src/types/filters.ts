/** Mirrors DateFilterType / DATE_FILTER_OPTIONS from types/public-events.ts on web. */
export type DateFilterType = 'TODAY' | 'THIS_WEEKEND' | 'THIS_WEEK' | 'THIS_MONTH' | '';

export const DATE_FILTER_OPTIONS: { value: DateFilterType; label: string }[] = [
  { value: 'TODAY', label: 'Today' },
  { value: 'THIS_WEEKEND', label: 'This Weekend' },
  { value: 'THIS_WEEK', label: 'This Week' },
  { value: 'THIS_MONTH', label: 'This Month' },
];

export interface EventFiltersState {
  dateFilter: DateFilterType;
  /** A specific picked calendar date (ISO yyyy-mm-dd) — mirrors web's "CUSTOM" single-date mode in date-sort-filter-controls.tsx. Mutually exclusive with dateFilter; picking one clears the other. Used as the range start when customDateEnd is also set. */
  customDate: string | null;
  /** Range end (ISO yyyy-mm-dd) — mirrors web's DateRange{from,to} range-picker mode in date-sort-filter-controls.tsx. Null for a single-date pick. */
  customDateEnd: string | null;
  tagIds: string[];
  virtual: boolean;
}

export const DEFAULT_EVENT_FILTERS: EventFiltersState = {
  dateFilter: '',
  customDate: null,
  customDateEnd: null,
  tagIds: [],
  virtual: false,
};

export function hasActiveFilters(filters: EventFiltersState): boolean {
  return filters.dateFilter !== '' || filters.customDate !== null || filters.tagIds.length > 0 || filters.virtual;
}
