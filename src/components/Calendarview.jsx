import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";

const CalendarView = ({ events, onEventAdd }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  // Get all days in the current month
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Find if an event exists for a specific day
  const getEventForDay = (day) => {
    return events.filter((event) => event.date === format(day, "yyyy-MM-dd"));
  };

  // Handle navigation to next/previous month
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Handle day selection and show event details
  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  // Handle adding new event for a selected day
  const handleAddEvent = () => {
    if (newEvent && selectedDate) {
      onEventAdd(selectedDate, newEvent); // Trigger the parent function to add event
      setNewEvent(""); // Clear the input
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <button onClick={handlePreviousMonth}>Previous Month</button>
        <span>{format(currentDate, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          padding: "20px",
        }}
      >
        {monthDays.map((day) => {
          const event = getEventForDay(day);
          return (
            <div
              key={day}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: event.length > 0 ? "#f5f5f5" : "white",
                position: "relative",
              }}
              onClick={() => handleDayClick(day)}
            >
              <div>{format(day, "d")}</div>
              {event.length > 0 && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {event[0].type} {/* Show event type for the first event */}
                </div>
              )}
              {selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event form */}
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Event for {format(selectedDate, "MMMM dd, yyyy")}</h3>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter event description"
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}

      {/* Show events for selected day */}
      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h3>Events for {format(selectedDate, "MMMM dd, yyyy")}</h3>
          <ul>
            {getEventForDay(selectedDate).map((event, index) => (
              <li key={index}>
                <strong>{event.type}</strong>
                <br />
                <small>{event.time}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
