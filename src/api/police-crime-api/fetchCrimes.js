// Fetch crimes for a given lat/lng and month
// yearMonth format: YYYY-MM e.g. 2025-03
export const fetchCrimes = async ({ queryKey }) => {
  const [_key, { lat, lng, yearMonth }] = queryKey;

  // Build the base URL
  let url = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`;
  
  // Only add the month if it has a value
  if (yearMonth) {
    url += `&date=${yearMonth}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok for lat=${lat}, lng=${lng}${yearMonth ? `, yearMonth=${yearMonth}` : ''}`);
  }
  return response.json();
}; 