import { useMemo } from 'react';

export function useCrimeSort(filteredCrimes, sortBy, sortDirection) {
  return useMemo(() => {
    if (!sortBy) return filteredCrimes;
    return [...filteredCrimes].sort((a, b) => {
      const aValue = a[sortBy] ? a[sortBy].toLowerCase() : '';
      const bValue = b[sortBy] ? b[sortBy].toLowerCase() : '';
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCrimes, sortBy, sortDirection]);
} 