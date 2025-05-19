import '../assets/css/app.css';
import React, { useState, useEffect } from 'react';
import { FiltersNavigationBar } from '../components/navigation/FiltersNavigationBar';
import { CrimeTable } from '../components/table/CrimeTable';
import { StatusMessage } from '../components/messages/StatusMessage';
import { WarningMessage } from '../components/messages/WarningMessage';
import { ErrorMessage } from '../components/messages/ErrorMessage';
import { useCrimeData } from '../hooks/useCrimeData';

const columns = [
  { id: 'officeLocation', label: 'Office' },
  { id: 'category', label: 'Category' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'location', label: 'Location' },
  { id: 'month', label: 'Month' },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedOffices, setSelectedOffices] = useState([]);

  const {
    isLoading,
    errors,
    officeLocations,
    sortedCrimes,
    allCrimes,
  } = useCrimeData(selectedMonth, selectedOffices, search, sortBy, sortDirection);

  return (
    <div className="app">
      <header className="app-header">
        <h1>UK Crime near Travel Chapter Office Locations</h1>
      </header>
      <FiltersNavigationBar
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        officeLocations={officeLocations}
        selectedOffices={selectedOffices}
        setSelectedOffices={setSelectedOffices}
        search={search}
        setSearch={setSearch}
      />

      {errors.length > 0 && (
        <WarningMessage>
          <p>Some locations failed to load:</p>
          <ul>
            {errors.map((error, index) => <li key={index}>{error.message}</li>)}
          </ul>
        </WarningMessage>
      )}

      {/* Table or error message */}
      {isLoading ? (
        <StatusMessage>Loading crime data...</StatusMessage>
      )

        : allCrimes.length > 0 ? (
          <CrimeTable
            columns={columns}
            crimes={sortedCrimes}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={(columnId) => {
              if (sortBy === columnId) {
                setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
              } else {
                setSortBy(columnId);
                setSortDirection('asc');
              }
            }}
          />
        )

          : (
            <ErrorMessage>
              No crime data available for the selected locations and month. 
              Try selecting a recent month, that is more than a month ago.
              </ErrorMessage>
          )}

    </div>
  );
}

export default App; 