import { BASE_URL } from "./config";

export interface CrimeOutcome {
  category?: { name?: string };
  date?: string;
  person_id?: string;
}

export interface MappedCrimeOutcome {
  category: string;
  date?: string;
  personId?: string;
}

// Fetch crime outcomes for a given persistent id
export const fetchCrimeOutcomes = async ({ queryKey }: { queryKey: any[] }): Promise<MappedCrimeOutcome[]> => {
  const [_key, { persistentId }] = queryKey;

  let url = `${BASE_URL}/outcomes-for-crime/${persistentId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok for persistentId=${persistentId}`);
  }

  const data = await response.json(); // Replace with real fetch

  if (!data || !Array.isArray(data.outcomes)) return [];

  return data.outcomes.map((outcome: CrimeOutcome) => ({
    category: outcome.category?.name || 'Unknown',
    date: outcome.date,
    personId: outcome.person_id,
  }));

}; 