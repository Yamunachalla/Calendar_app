import React, { useState } from "react";
import dayjs from "dayjs";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTime, setEventTime] = useState("");

  // Function to check if an event is overdue
  const isOverdue = (date, time) => {
    const currentDateTime = dayjs(); // Current date and time
    const eventDateTime = dayjs(`${date} ${time}`); // Event date and time

    return eventDateTime.isBefore(currentDateTime, "minute"); // Check if the event has already passed
  };

  // Function to check if an event is due today (ignores the time)
  const isDueToday = (date, time) => {
    const currentDateStartOfDay = dayjs().startOf("day"); // Start of today (midnight)
    const eventDateStartOfDay = dayjs(date).startOf("day"); // Start of event date (midnight)

    return eventDateStartOfDay.isSame(currentDateStartOfDay, "day") && !isOverdue(date, time); // Only due today if it's today but not overdue
  };

  // Function to get the highlight color for overdue and due today
  const getHighlightColor = (date, time) => {
    if (isOverdue(date, time)) return "red"; // Overdue -> Red
    if (isDueToday(date, time)) return "yellow"; // Due Today -> Yellow
    return ""; // No highlight
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent || !eventTime || !eventType) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedEvents = {
      ...events,
      [selectedDate]: [
        ...(events[selectedDate] || []),
        { event: newEvent, type: eventType, time: eventTime, highlight: getHighlightColor(selectedDate, eventTime) },
      ],
    };
    setEvents(updatedEvents);
    setNewEvent(""); // Clear the input field
    setEventTime(""); // Clear the time field
    setEventType(""); // Clear the event type
  };

  const handleMonthChange = (direction) => {
    setCurrentDate(currentDate.add(direction, "month"));
  };

  const renderCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = endOfMonth.date();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentDate.date(i).format("YYYY-MM-DD");
      days.push(
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px",
            cursor: "pointer",
            backgroundColor: selectedDate === date ? "#b2dfdb" : "#fff",
          }}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {events[date] && (
            <ul style={{ fontSize: "10px", marginTop: "5px" }}>
              {events[date].map((event, idx) => (
                <li key={idx} style={{ color: event.highlight }}>
                  {event.type}: {event.event} at {event.time}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      {/* Calendar Section */}
      <div style={{ flex: "1", maxWidth: "50%" }}>
        <h3 style={{ textAlign: "center" }}>
          {currentDate.format("MMMM YYYY")}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
          }}
        >
          {renderCalendar()}
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={() => handleMonthChange(-1)} style={navButtonStyle}>
            Previous Month
          </button>
          <button onClick={() => handleMonthChange(1)} style={navButtonStyle}>
            Next Month
          </button>
        </div>
      </div>

      {/* Event Scheduler Section */}
      <div
        style={{
          flex: "1",
          backgroundColor: "#f1f8e9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Event Scheduler</h3>
        <div>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Add Event for: {selectedDate || "Select a date from the calendar"}
          </label>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Event Description"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            placeholder="Event Type (e.g., Email, Call)"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button onClick={handleAddEvent} style={navButtonStyle}>
            Add Event
          </button>
        </div>
        {selectedDate && (
          <div style={{ marginTop: "20px" }}>
            <h4>Events for {selectedDate}:</h4>
            <ul>
              {(events[selectedDate] || []).map((event, idx) => (
                <li key={idx} style={{ color: event.highlight }}>
                  {event.type}: {event.event} at {event.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const navButtonStyle = {
  padding: "10px 20px",
  margin: "5px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default CalendarView;
