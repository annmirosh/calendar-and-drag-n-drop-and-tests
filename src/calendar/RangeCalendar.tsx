import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const adapter = new AdapterDayjs();

type RangeCalendarProps = {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
};

function RangeCalendar({ onChange }: RangeCalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (ts: number | null) => {
    const selDate: Date | null = ts ? new Date(+ts) : null;

    if (startDate && endDate === null && selDate && startDate < selDate) {
      setStartDate(startDate);
      setEndDate(selDate);
      onChange(startDate, selDate);
    } else if (startDate && endDate === null && selDate && startDate > selDate) {
      setStartDate(selDate);
      setEndDate(startDate);
      onChange(selDate, startDate);
    } else {
      setStartDate(selDate);
      setEndDate(null);
      onChange(selDate, null);
    }
  }
  const firstAvailableSlotDay = adapter.date(startDate) as unknown as number;

  return (
    <DateCalendar
      value={firstAvailableSlotDay}
      onChange={handleDateChange}
    />
  );
}


export default RangeCalendar;

