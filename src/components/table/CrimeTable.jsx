import '../../assets/css/table.css';
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { PaginatedTable } from './PaginatedTable';
import { CrimeTableRow } from './CrimeTableRow';

// Table of crimes from the police data API response
export function CrimeTable({ columns, crimes, sortBy, sortDirection, handleSort }) {
  const [expandedRows, setExpandedRows] = useState({});

  const handleToggle = (persistentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [persistentId]: !prev[persistentId]
    }));
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <PaginatedTable data={crimes}>
          {(paginatedCrimes) => (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      onClick={() => handleSort(col.id)}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      {col.label}
                      {sortBy === col.id ? (
                        sortDirection === 'asc' ? ' ▲' : ' ▼'
                      ) : ''}
                    </TableCell>
                  ))}
                  <TableCell>Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCrimes.map((crime) => (
                  <CrimeTableRow
                    key={crime.id}
                    crime={crime}
                    columns={columns}
                    isExpanded={!!expandedRows[crime.persistentId]}
                    onToggle={handleToggle}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </PaginatedTable>
      </TableContainer>
    </div>
  );
}
