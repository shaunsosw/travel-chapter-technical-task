import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export function MonthFilter({ selectedMonth, onMonthChange }) {
  // Local state for the picker
  const [pickerValue, setPickerValue] = useState(selectedMonth ? dayjs(selectedMonth) : null);

  // Sync local picker value if selectedMonth changes from outside
  useEffect(() => {
    setPickerValue(selectedMonth ? dayjs(selectedMonth) : null);
  }, [selectedMonth]);

  const today = dayjs();
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Month"
        maxDate={today}
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