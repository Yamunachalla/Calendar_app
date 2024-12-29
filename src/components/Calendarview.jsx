import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isBefore, isToday } from "date-fns";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ type: "", startTime: "", endTime: "" });

  // Generate the days of the month
  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

  // Add a new event
  const addEvent = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      { date: selectedDay, ...newEvent }
    ]);
    setNewEvent({ type: "", startTime: "", endTime: "" });
    setSelectedDay(null);
  };

  // Filter events for the selected day
  const eventsForSelectedDay = events.filter(
    (event) => format(new Date(event.date), "yyyy-MM-dd") === format(selectedDay, "yyyy-MM-dd")
  );

  // Change month
  const changeMonth = (direction) => {
    setCurrentDate(direction === "next" ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  // Helper function to determine event status for color coding
  const getEventStatus = (day) => {
    const dayEvents = events.filter(
      (event) => format(new Date(event.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
    
    if (dayEvents.length > 0) {
      const incompleteEvent = dayEvents.find((event) => !event.completed);
      if (incompleteEvent) {
        if (isToday(day)) return 'yellow'; // Due today
        if (isBefore(day, new Date())) return 'red'; // Overdue
      }
    }
    return ''; // No highlight
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
        <button onClick={() => changeMonth("previous")}>Previous Month</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => changeMonth("next")}>Next Month</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", padding: "20px" }}>
        {monthDays.map((day) => {
          const status = getEventStatus(day); // Get color status for the day
          const eventsForDay = events.filter(
            (event) => format(new Date(event.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );
          
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
                backgroundColor: status === 'yellow' ? '#f9f047' : status === 'red' ? '#f47a47' : 'white', // Apply color based on status
              }}
              onClick={() => setSelectedDay(day)}
            >
              <div>{format(day, "d")}</div>
              {eventsForDay.length > 0 && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {eventsForDay.length === 1
                    ? eventsForDay[0].type
                    : `${eventsForDay.length} events`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div style={{ padding: "20px", border: "1px solid #ddd", marginTop: "20px" }}>
          <h3>Add Event for {format(selectedDay, "MMMM dd, yyyy")}</h3>
          <input
            type="text"
            placeholder="Event Type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
          />
          <input
            type="time"
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
          />
          <input
            type="time"
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
            style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
          />
          <button onClick={addEvent} style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" }}>
            Add Event
          </button>

          <div style={{ marginTop: "20px" }}>
            <h4>Events for {format(selectedDay, "MMMM dd, yyyy")}</h4>
            {eventsForSelectedDay.length === 0 ? (
              <p>No events for this day</p>
            ) : (
              eventsForSelectedDay.map((event, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <strong>{event.type}</strong> | {event.startTime} - {event.endTime}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
