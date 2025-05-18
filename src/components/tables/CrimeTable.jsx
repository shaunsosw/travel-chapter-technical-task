import '../../assets/css/table.css';
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Tooltip
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CrimeOutcomes } from './CrimeOutcomes';

// Table of crimes
export function CrimeTable({ columns, crimes, sortBy, sortDirection, handleSort }) {
  // Create a map to store outcomes data for each crime
  const [expandedRows, setExpandedRows] = React.useState({});

  // Handle row expansion
  const handleToggle = (persistentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [persistentId]: !prev[persistentId] // example: "crime123": true, (expanded row)
    }));
  };

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
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crimes.map((crime) => {
              const isExpanded = expandedRows[crime.persistentId];
              
              return (
                <React.Fragment key={crime.id}>
                  <TableRow>
                    <TableCell>{crime.officeLocation}</TableCell>
                    <TableCell>{crime.category}</TableCell>
                    <TableCell>{crime.outcome}</TableCell>
                    <TableCell>{crime.location}</TableCell>
                    <TableCell>{crime.month}</TableCell>
                    <TableCell>
                      {crime.persistentId ? (
                        <Tooltip title="Show outcomes for this crime">
                          <IconButton size="small" onClick={() => handleToggle(crime.persistentId)}>
                            {isExpanded ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="No persistent ID available">
                          <span style={{ color: '#aaa', fontSize: '1.2em', cursor: 'not-allowed' }}>—</span>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                  {crime.persistentId && isExpanded && (
                    <TableRow className="expanded-row">
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
                        <Collapse in={isExpanded} timeout={0} unmountOnExit>
                          <div className="expanded-content">
                            <p>All Outcomes for Crime above</p>
                            <CrimeOutcomes persistentId={crime.persistentId} />
                          </div>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
