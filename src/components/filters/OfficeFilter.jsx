import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

export function OfficeFilter({ officeLocations, selectedOffices, setSelectedOffices }) {
  const handleOfficeChange = (event) => {
    const value = event.target.value;
    setSelectedOffices(typeof value === 'string' ? value.split(',') : value);
  };
  const isDisabled = officeLocations.length === 0;

  return (
    <FormControl
      disabled={isDisabled}
    >
      <InputLabel id="office-select-label">Filter by Office</InputLabel>
      <Select
        labelId="office-select-label"
        multiple
        value={selectedOffices}
        onChange={handleOfficeChange}
        label="Filter by Office"
        className="office-filter"
        renderValue={(selected) => {
          if (selected.length === 0) {
            return "All offices";
          }
          return selected.join(', ');
        }}
        disabled={isDisabled}
      >
        {officeLocations.map((office) => (
          <MenuItem key={office} value={office}>
            <Checkbox checked={selectedOffices.indexOf(office) > -1} />
            <ListItemText primary={office} />
          </MenuItem>
        ))}
      </Select>
      
    </FormControl>
  );
} 