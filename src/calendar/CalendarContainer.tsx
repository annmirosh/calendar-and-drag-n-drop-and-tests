import React, { useState } from 'react';
import RangeCalendar from './RangeCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import 'dayjs/locale/ru';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';


function formatDate(date: Date | null) {
  return date ? date.toDateString() : '-';
}

function CalendarContainer() {
  const [label, setLabel] = useState<string>('');
  const [locale, setLocale] = useState<string>('en');
  const handleLocaleChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value as string);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <div className='calendar-container'>
        <Box sx={{ minWidth: 120 }} className="to-right">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Locale</InputLabel>
            <Select
              labelId="demo-select-small-label"
              value={locale}
              label="Locale"
              onChange={handleLocaleChange}
            >
              <MenuItem value={'en'}>en</MenuItem>
              <MenuItem value={'fr'}>fr</MenuItem>
              <MenuItem value={'ru'}>ru</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />
        <br />
        <br />
        <br />
        <div style={{ margin: 'auto', maxWidth: '300px', minHeight: '60px' }}>
          Selected dates<br />
          {label}
        </div>
        <br />
        <RangeCalendar onChange={(startDate, endDate) => {
          setLabel(`start date: ${formatDate(startDate)}, end date: ${formatDate(endDate)}`);
        }} />
      </div>
    </LocalizationProvider>
  );
}

export default CalendarContainer;
