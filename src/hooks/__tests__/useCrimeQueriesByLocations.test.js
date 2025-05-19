import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as fetchCrimesModule from '../../api/police-crime-api/fetchCrimes';
import { useCrimeQueriesByLocations } from '../useCrimeQueries';
import { locations } from '../../api/police-crime-api/locations';

// Mock crime data
const mockCrimeData = [
  {
    id: 'foo',
    officeLocation: 'wales',
    persistentId: 'pid1',
    category: 'foobar',
    outcome: 'no outcome',
    location: 'foobar nightclub',
    month: '2025-03',
  },
];

describe('useCrimeQueriesByLocations', () => {
  beforeEach(() => {
    // Mock the fetchCrimes function
    jest.spyOn(fetchCrimesModule, 'fetchCrimes').mockResolvedValue(mockCrimeData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and transforms crime data for all locations', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useCrimeQueriesByLocations('2025-03'),
      { wrapper }
    );

    // Wait for all queries to be successful
    await waitFor(() =>
      result.current.every(q => q.isSuccess)
    );

    // Check the transformed data
    result.current.forEach((query, idx) => {
      expect(query.data).toEqual([
        {
          id: 'foo',
          officeLocation: "wales",
          persistentId: 'pid1',
          category: 'foobar',
          outcome: 'no outcome',
          location: 'foobar nightclub',
          month: '2025-03',
        },
      ]);
    });
  });
}); 