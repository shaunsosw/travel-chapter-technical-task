import './assets/css/App.css';
import { useCrimeQueriesByLocations } from './api/police-crime-api/useCrimeQueries';

function App() {
  const queryResults = useCrimeQueriesByLocations();

  const isLoading = queryResults.every((query) => query.isLoading);
  const errors = queryResults.filter((query) => query.isError).map(query => query.error);
  const successfulData = queryResults.filter((query) => query.isSuccess && query.data);

  // Collate data from all successful queries
  // Will show successful query data even if some location queries failed
  const allCrimes = successfulData.reduce((acc, queryResult) => {
    return acc.concat(queryResult.data);
  }, []);

  if (isLoading) return <div className="app-message">Loading crime data...</div>;

  // If all locationqueries failed and error message is shown
  if (successfulData.length === 0 && errors.length > 0) {
    return (
      <div className="app-message error">
        <p>Error fetching crime data for all locations:</p>
        <ul>
          {errors.map((error, index) => <li key={index}>{error.message}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>UK Crime Data</h1>
      </header>
      {/* Show warning if some location queries failed */}
      {errors.length > 0 && (
        <div className="app-message warning">
          <p>Some locations failed to load:</p>
          <ul>
            {errors.map((error, index) => <li key={index}>{error.message}</li>)}
          </ul>
        </div>
      )}
      {allCrimes.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Office</th>
                <th>Category</th>
                <th>Outcome</th>
                <th>Location</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {allCrimes.map((crime) => (
                <tr key={crime.id}>
                  <td>{crime.officeLocation}</td>
                  <td>{crime.category}</td>
                  <td>{crime.outcome}</td>
                  <td>{crime.location}</td>
                  <td>{crime.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="app-message">No crime data available for the selected locations.</div>
      )}
    </div>
  );
}

export default App; 