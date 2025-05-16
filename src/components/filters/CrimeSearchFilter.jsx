import React from 'react';
import { TextField } from '@mui/material';

export function CrimeSearchFilter({ search, setSearch }) {
  return (
    <TextField
      label="Search crimes, (filtered as you type)"
      variant="outlined"
      className="crime-search-filter"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

