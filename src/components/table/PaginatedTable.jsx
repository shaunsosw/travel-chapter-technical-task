import React from 'react';
import { TablePagination } from '@mui/material';
import { usePagination } from '../../hooks/usePagination';

// Wrapper component for the table that adds pagination returns the paginated data and the pagination controls
export function PaginatedTable({ data, rowsPerPageOptions = [5, 10, 25, 50], defaultRowsPerPage = 10, children }) {
  const {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(data, defaultRowsPerPage);

  return (
    <>
      {children(paginatedData)}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  );
} 