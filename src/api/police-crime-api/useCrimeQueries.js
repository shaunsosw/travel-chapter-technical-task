import { useQueries } from '@tanstack/react-query';
import { fetchCrimes } from './fetchCrimes';
import { locations } from './locations';

// hook to fetch crime data for all office locations in locations.js
export function useCrimeQueriesByLocations() {
  // useQueries hook runs multiple queries in parallel
  return useQueries({
    queries: locations.map((location) => ({
      queryKey: ['crimes', { lat: location.lat, lng: location.lng }],
      queryFn: fetchCrimes,
      select: (data) => {
        //transform crime data for only the fields needed in
        return data.map(crime => ({
          id: crime.id,
          officeLocation: location.id,
          category: crime?.category || 'No category',
          outcome: crime.outcome_status?.category || 'No outcome',
          location: crime?.location?.street?.name || 'No location',
          month: crime?.month || 'No month',
        }));
      },
    })),
  });
}