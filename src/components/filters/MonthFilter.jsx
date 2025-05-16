import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export function MonthFilter({ selectedMonth, onMonthChange }) {
  // Local state for the picker
  const [pickerValue, setPickerValue] = useState(selectedMonth ? dayjs(selectedMonth) : null);

  // Sync local picker value if selectedMonth changes from outside
  React.useEffect(() => {
    setPickerValue(selectedMonth ? dayjs(selectedMonth) : null);
  }, [selectedMonth]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Month"
        views={['year', 'month']}
        value={pickerValue}
        onChange={(newValue) => setPickerValue(newValue)}
        onAccept={(newValue) => {
          if (newValue) {
            const formattedDate = newValue.format('YYYY-MM');
            onMonthChange(formattedDate);
          }
        }}
        className="month-filter"
        slotProps={{ textField: { sx: { minWidth: 200, width: 250 } } }}
      />
    </LocalizationProvider>
  );
} 