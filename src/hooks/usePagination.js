import { useState } from 'react';

// Pagination hook returns the page, rows per page, the paginated data, and the functions to change the page and rows per page
export function usePagination(data, defaultRowsPerPage = 15) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Paginated data is the data sliced to the current page and rows per page
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage); // example: page 1, rows per page 15, data.length 100, paginatedData is data.slice(15, 30)

  return {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
    setPage,
    setRowsPerPage,
  };
} 