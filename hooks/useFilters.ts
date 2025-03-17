// src/hooks/useFilters.ts
import { useState, useCallback } from 'react';
import { DateRange } from 'react-day-picker';
import { subMonths } from 'date-fns';

interface FilterOptions {
  dateRange: DateRange;
  comparison: 'none' | 'previousPeriod' | 'previousYear';
  groupBy: 'day' | 'week' | 'month';
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      from: subMonths(new Date(), 1),
      to: new Date(),
    },
    comparison: 'none',
    groupBy: 'month',
  });

  const updateDateRange = useCallback((range: DateRange) => {
    setFilters((prev) => ({ ...prev, dateRange: range }));
  }, []);

  const updateComparison = useCallback((comparison: 'none' | 'previousPeriod' | 'previousYear') => {
    setFilters((prev) => ({ ...prev, comparison }));
  }, []);

  const updateGroupBy = useCallback((groupBy: 'day' | 'week' | 'month') => {
    setFilters((prev) => ({ ...prev, groupBy }));
  }, []);

  return {
    filters,
    updateDateRange,
    updateComparison,
    updateGroupBy,
  };
}
