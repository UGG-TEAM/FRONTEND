import { useState } from 'react';
import Calendar from 'react-calendar';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };
  return <Calendar onChange={onChange} value={date} />;
}
