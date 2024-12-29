import React, { useState } from 'react';
import CalendarView from '../components/Calendarview';

const UserPage = () => {
  // Hardcoded events data
  const [events, setEvents] = useState([
    { date: new Date(2024, 0, 5), type: 'Meeting', completed: false },
    { date: new Date(2024, 0, 10), type: 'Call', completed: false },
    { date: new Date(2024, 0, 15), type: 'Email', completed: true }, // Example of a completed event
  ]);

  // Hardcoded company data for dashboard
  const companies = [
    {
      name: 'TechCorp',
      lastCommunication: 'LinkedIn Post - 5th September',
      nextCommunication: 'Email - 10th September',
    },
    {
      name: 'Innovate Inc.',
      lastCommunication: 'Phone Call - 12th September',
      nextCommunication: 'LinkedIn Message - 20th September',
    },
    {
      name: 'Global Solutions',
      lastCommunication: 'Email - 1st September',
      nextCommunication: 'Meeting - 7th September',
    },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ type: '', startTime: '', endTime: '' });

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    const eventDate = new Date(selectedDate);
    const event = { ...newEvent, date: eventDate, completed: false };
    setEvents([...events, event]);
    setNewEvent({ type: '', startTime: '', endTime: '' });
    setSelectedDate(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      {/* Dashboard Section */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Company Communications</h2>
        {companies.map((company, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{company.name}</h3>
            <p>Last Communication: {company.lastCommunication}</p>
            <p>Next Scheduled Communication: {company.nextCommunication}</p>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <CalendarView events={events} onDayClick={handleDayClick} />

      {/* Add Event Form (Displayed when a date is clicked) */}
      {selectedDate && (
        <div style={{ marginTop: '20px' }}>
          <h3>Add Event for {selectedDate}</h3>
          <input
            type="text"
            placeholder="Event Type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          />
          <br />
          <input
            type="time"
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
          />
          <input
            type="time"
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
          />
          <br />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
