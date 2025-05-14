// Fetch crimes for a given lat/lng
//@todo add month as argument
export const fetchCrimes = async ({ queryKey }) => {
  const [_key, { lat, lng }] = queryKey;
  const response = await fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`
  );
  if (!response.ok) {
    throw new Error(`Network response was not ok for lat=${lat}, lng=${lng}`);
  }
  return response.json();
}; 

//@todo add a method to get outcomes for a given crime id