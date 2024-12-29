import React, { useState } from "react";
import CalendarView from "./components/Calendarview";

const App = () => {
  // Example events
  const [events, setEvents] = useState([
    { date: "2024-12-05", type: "Meeting" },
    { date: "2024-12-10", type: "Follow-up Call" },
    { date: "2024-12-15", type: "Email Sent" },
  ]);

  // Handle day click (log the date clicked)
  const handleDayClick = (date) => {
    alert(`You clicked on ${date}`);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <CalendarView events={events} onDayClick={handleDayClick} />
    </div>
  );
};

export default App;
