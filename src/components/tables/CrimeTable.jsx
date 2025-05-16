import '../../assets/css/table.css';
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

//Table of crimes
export function CrimeTable({ columns, crimes, sortBy, sortDirection, handleSort }) {
  return (
    <div className="table-container">
      <TableContainer component={Paper}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {crimes.map((crime) => (
              <TableRow key={crime.id}>
                <TableCell>{crime.officeLocation}</TableCell>
                <TableCell>{crime.category}</TableCell>
                <TableCell>{crime.outcome}</TableCell>
                <TableCell>{crime.location}</TableCell>
                <TableCell>{crime.month}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
