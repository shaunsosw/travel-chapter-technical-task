import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

// Search filter text fieldcomponent for the crimes table
export function CrimeSearchFilter({ search, setSearch }) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce the search input, will only trigger after 300ms of inactivity in user typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(handler); // reset the timeout if user carrys on typing
  }, [localSearch, setSearch]);

  return (
    <TextField
      label="Search crimes"
      variant="outlined"
      className="crime-search-filter"
      value={localSearch}
      onChange={e => setLocalSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

