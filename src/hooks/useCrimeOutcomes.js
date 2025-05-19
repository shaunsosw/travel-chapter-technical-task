import { useQuery } from '@tanstack/react-query';
import { fetchCrimeOutcomes } from '../api/police-crime-api/fetchCrimeOutcomes.ts';

//hook to fetch crime outcomes for a specific persistent id
export function useCrimeOutcomes(persistentId) {
  const { data: outcomes, isLoading, isError, error } = useQuery({
    queryKey: ['crimeOutcomes', { persistentId }],
    queryFn: fetchCrimeOutcomes,
    enabled: !!persistentId, // Only run the query if persistentId exists
  });

  return {
    outcomes,
    isLoading,
    isError,
    error
  };
} 