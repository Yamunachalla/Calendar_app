import React from "react";

const NotificationPanel = ({ overdueCount, todaysCount, overdueData, todaysData }) => {
  return (
    <div>
      <h3>Notifications</h3>
      <p>
        Overdue: {overdueCount} | Due Today: {todaysCount}
      </p>
      <h4>Overdue Communications</h4>
      <ul>
        {overdueData.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
      <h4>Today's Communications</h4>
      <ul>
        {todaysData.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
