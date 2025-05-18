import { useQuery } from '@tanstack/react-query';
import { fetchCrimeOutcomes } from '../api/police-crime-api/fetchCrimeOutcomes';

//hook to fetch crime outcomes for a specific persistent id
export function useCrimeOutcomes(persistentId) {
  const { data: outcomes, isLoading, isError, error } = useQuery({
    queryKey: ['crimeOutcomes', { persistentId }],
    queryFn: fetchCrimeOutcomes,
    select: (data) => {
        // Map the outcomes data to the format needed by the CrimeOutcomes component
        if (!data || !Array.isArray(data.outcomes)) return [];
        return data.outcomes.map(outcome => ({
            category: outcome.category?.name || 'Unknown',
            date: outcome.date,
            personId: outcome.person_id,
        }));
    },
    enabled: !!persistentId, // Only run the query if persistentId exists
  });

  return {
    outcomes,
    isLoading,
    isError,
    error
  };
} 