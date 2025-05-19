import React from 'react';
import { useCrimeOutcomes } from '../../hooks/useCrimeOutcomes';

// Dropdown of outcomes for a crime in an ordered list
export function CrimeOutcomes({ persistentId }) {
  const {
    outcomes,
    isLoading,
    isError,
    error,
  } = useCrimeOutcomes(persistentId);

  if (isLoading) {
    return <div style={{ margin: 8 }}><span>Loading outcomes...</span></div>;
  }

  if (isError) {
    return <span style={{ color: 'red' }}>{error.message}</span>;
  }

  // Check if outcomes exists and is an array
  if (!outcomes || !Array.isArray(outcomes)) {
    return <span>No outcomes found or invalid data format.</span>;
  }

  if (outcomes.length === 0) {
    return <span>No outcomes found.</span>;
  }

  return (
    <div style={{ margin: 8 }}>
      <ul>
        {outcomes.map((outcome, idx) => (
          <li key={idx}>
            <strong>{outcome.category}</strong> ({outcome.date})
          </li>
        ))}
      </ul>
    </div>
  );
} 