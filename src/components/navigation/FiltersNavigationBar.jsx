import React from 'react';
import { MonthFilter } from '../filters/MonthFilter';
import { OfficeFilter } from '../filters/OfficeFilter';
import { CrimeSearchFilter } from '../filters/CrimeSearchFilter';


//Filters Navigation Bar at the top of the table
export function FiltersNavigationBar({
  selectedMonth,
  onMonthChange,
  officeLocations,
  selectedOffices,
  setSelectedOffices,
  search,
  setSearch
}) {
  return (
    <div className="filters-row">
      <CrimeSearchFilter search={search} setSearch={setSearch} />
      <div className="flex-spacer" style={{ flex: 1 }} />
      <MonthFilter selectedMonth={selectedMonth} onMonthChange={onMonthChange} />
      <OfficeFilter
        officeLocations={officeLocations}
        selectedOffices={selectedOffices}
        setSelectedOffices={setSelectedOffices}
      />
    </div>
  );
}
