import { useQueries } from '@tanstack/react-query';
import { fetchCrimes } from '../api/police-crime-api/fetchCrimes';
import { locations } from '../api/police-crime-api/locations';

// hook to fetch crime data for all office locations in locations.js
export function useCrimeQueriesByLocations(yearMonth) {
  // useQueries hook runs multiple queries in parallel
  return useQueries({
    queries: locations.map((location) => ({
      queryKey: ['crimes', { lat: location.lat, lng: location.lng, yearMonth: yearMonth }],
      queryFn: fetchCrimes,
      select: (data) => {
        //transform crime data for only the fields needed in
        return data.map(crime => ({
          id: crime.id,
          officeLocation: location.id,
          persistentId: crime.persistent_id,
          category: crime?.category || 'No category',
          outcome: crime.outcome_status?.category || 'No outcome',
          location: crime?.location?.street?.name || 'No location',
          month: crime?.month || 'No month',
        }));
      },
    })),
  });
}