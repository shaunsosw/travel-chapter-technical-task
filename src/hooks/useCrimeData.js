import { useCrimeQueriesResults } from './useCrimeQueriesResults';
import { useCrimeFilters } from './useCrimeFilters';
import { useCrimeSort } from './useCrimeSort';

export function useCrimeData(selectedMonth, selectedOffices, search, sortBy, sortDirection) {
  const { isLoading, errors, allCrimes, officeLocations } = useCrimeQueriesResults(selectedMonth);
  const filteredCrimes = useCrimeFilters(allCrimes, selectedOffices, search);
  const sortedCrimes = useCrimeSort(filteredCrimes, sortBy, sortDirection);

  return {
    isLoading,
    errors,
    officeLocations,
    sortedCrimes,
    allCrimes,
  };
} 