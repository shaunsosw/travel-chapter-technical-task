export function useCrimeFilters(allCrimes, selectedOffices, search) {
  // Filter by selected offices (if any selected)
  const officeFilteredCrimes = selectedOffices.length > 0
    ? allCrimes.filter(crime => selectedOffices.includes(crime.officeLocation))
    : allCrimes;

  // Filter crimes by search term (not case-sensitive, matches any field)
  const filteredCrimes = officeFilteredCrimes.filter((crime) => {
    const term = search.toLowerCase();
    return (
      crime.officeLocation.toLowerCase().includes(term) ||
      crime.category.toLowerCase().includes(term) ||
      crime.outcome.toLowerCase().includes(term) ||
      crime.location.toLowerCase().includes(term) ||
      crime.month.toLowerCase().includes(term)
    );
  });

  return filteredCrimes;
} 