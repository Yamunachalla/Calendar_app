import React, { useState, useEffect } from "react";

const RealTimeActivityLog = () => {
  const [activities, setActivities] = useState([
    { user: "John", company: "Company A", action: "Email Sent", timestamp: "2024-12-28 10:00 AM" },
    { user: "Jane", company: "Company B", action: "Follow-Up Call", timestamp: "2024-12-28 11:30 AM" },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = {
        user: "Sam",
        company: "Company C",
        action: "Meeting Scheduled",
        timestamp: new Date().toLocaleString(),
      };
      setActivities((prev) => [newActivity, ...prev]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Real-Time Activity Log</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.user}</strong> performed <strong>{activity.action}</strong> for{" "}
            <strong>{activity.company}</strong> at {activity.timestamp}.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeActivityLog;
