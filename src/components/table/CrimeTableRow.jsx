import React from 'react';
import { TableRow, TableCell, IconButton, Tooltip, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CrimeOutcomes } from './CrimeOutcomes';

// Table row component for a crime
export function CrimeTableRow({ crime, columns, isExpanded, onToggle }) {
  return (
    <>
      <TableRow>
        <TableCell>{crime.officeLocation}</TableCell>
        <TableCell>{crime.category}</TableCell>
        <TableCell>{crime.outcome}</TableCell>
        <TableCell>{crime.location}</TableCell>
        <TableCell>{crime.month}</TableCell>
        <TableCell>
          {crime.persistentId ? (
            <Tooltip title="Show outcomes for this crime">
              <IconButton size="small" onClick={() => onToggle(crime.persistentId)}>
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="No crime outcomes available">
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
    </>
  );
} 