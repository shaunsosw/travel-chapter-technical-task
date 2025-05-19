import { BASE_URL } from "./config";

// Raw crime data from API
export interface Crime {
  id: string;
  persistent_id?: string;
  category?: string;
  outcome_status?: { 
    category?: string 
  };
  location?: { 
    street?: { 
      name?: string 
    } 
  };
  month?: string;
}

// Transformed crime data
export interface MappedCrime {
  id: string;
  officeLocation: string;
  persistentId: string | undefined;
  category: string;
  outcome: string;
  location: string;
  month: string;
}

// Args for the fetchCrimes function
interface FetchCrimesArgs {
  queryKey: [string, { 
    lat: string; 
    lng: string; 
    yearMonth?: string;
    officeId: string; // Added for transformation
  }];
}

// Fetch crimes for a given lat/lng and month
// yearMonth format: YYYY-MM e.g. 2025-03
export const fetchCrimes = async ({ queryKey }: FetchCrimesArgs): Promise<MappedCrime[]> => {
  const [_key, { lat, lng, yearMonth, officeId }] = queryKey;

  // Build the base URL
  let url = `${BASE_URL}/crimes-street/all-crime?lat=${lat}&lng=${lng}`;
  
  // Only add the month if it has a value
  if (yearMonth) {
    url += `&date=${yearMonth}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok for lat=${lat}, lng=${lng}${yearMonth ? `, yearMonth=${yearMonth}` : ''}`);
  }

  // Get the raw data
  const crimes: Crime[] = await response.json();

  // Transform the data (moved from useCrimeQueries)
  return crimes.map(crime => ({
    id: crime.id,
    officeLocation: officeId,
    persistentId: crime.persistent_id,
    category: crime?.category || 'No category',
    outcome: crime.outcome_status?.category || 'No outcome',
    location: crime?.location?.street?.name || 'No location',
    month: crime?.month || 'No month',
  }));
}; 