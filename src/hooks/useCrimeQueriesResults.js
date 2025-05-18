import { useCrimeQueriesByLocations } from './useCrimeQueries';

export function useCrimeQueriesResults(selectedMonth) {
  const queryResults = useCrimeQueriesByLocations(selectedMonth);

  const isLoading = queryResults.every((query) => query.isLoading);
  const errors = queryResults.filter((query) => query.isError).map(query => query.error);
  const successfulData = queryResults.filter((query) => query.isSuccess && query.data);

  // Collate data from all successful queries
  const allCrimes = successfulData.reduce((acc, queryResult) => {
    return acc.concat(queryResult.data);
  }, []);

  // Extract unique office locations for the office filter
  const officeLocations = Array.from(new Set(allCrimes.map(c => c.officeLocation)));

  return { isLoading, errors, allCrimes, officeLocations };
} 