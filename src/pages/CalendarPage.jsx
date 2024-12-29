import React from "react";
import CalendarView from "../components/Calendarview";


const CalendarPage = () => {
  const events = [
    { date: "2024-01-10", type: "Email" },
    { date: "2024-01-15", type: "Phone Call" },
  ];

  const handleDayClick = (date) => {
    alert(`You clicked on ${date}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Calendar</h1>
      <CalendarView events={events} onDayClick={handleDayClick} />
    </div>
  );
};

export default CalendarPage;
