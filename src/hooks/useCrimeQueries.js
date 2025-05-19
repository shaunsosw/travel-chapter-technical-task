import { useQueries } from '@tanstack/react-query';
import { fetchCrimes } from '../api/police-crime-api/fetchCrimes';
import { locations } from '../api/police-crime-api/locations';

// hook to fetch crime data for all office locations in locations.js
export function useCrimeQueriesByLocations(yearMonth) {
  // useQueries hook runs multiple queries in parallel
  return useQueries({
    queries: locations.map((location) => ({
      queryKey: ['crimes', { lat: location.lat, lng: location.lng, yearMonth, officeId: location.id }],
      queryFn: fetchCrimes,
      // No more select function needed - transformation happens in fetchCrimes
    })),
  });
}