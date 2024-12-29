import React, { useState } from "react";
import CalendarView from "./components/Calendarview";
import UserDashboard from "./components/UserDashboard";
import { format } from "date-fns";

const App = () => {
  const [showCalendar, setShowCalendar] = useState(true);  // To toggle between CalendarView and UserDashboard

  const companies = [
    {
      name: "Company A",
      lastCommunication: "Email - 10th December",
      nextCommunication: "Call - 15th January",
    },
    {
      name: "Company B",
      lastCommunication: "LinkedIn Post - 5th November",
      nextCommunication: "Email - 20th December",
    },
    {
      name: "Company C",
      lastCommunication: "Meeting - 12th October",
      nextCommunication: "Email - 2nd January",
    },
  ];

  return (
    <div>
      <h1>Company Communication Dashboard</h1>

      {/* Toggle between CalendarView and UserDashboard */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShowCalendar(true)} style={{ padding: "10px" }}>
          Calendar View
        </button>
        <button onClick={() => setShowCalendar(false)} style={{ padding: "10px" }}>
          Dashboard View
        </button>
      </div>

      {/* Display Calendar or User Dashboard based on the state */}
      {showCalendar ? (
        <div>
          <h2>Calendar View</h2>
          <CalendarView />
        </div>
      ) : (
        <div>
          <h2>User Dashboard</h2>
          <UserDashboard companies={companies} />
        </div>
      )}
    </div>
  );
};

export default App;
