import React from "react";

const EngagementEffectivenessDashboard = () => {
  const data = [
    { method: "Email", successRate: 75 },
    { method: "Phone Call", successRate: 60 },
    { method: "LinkedIn Post", successRate: 90 },
    { method: "SMS", successRate: 50 },
  ];

  return (
    <div>
      <h2>Engagement Effectiveness</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.method}:</strong> {item.successRate}% success rate
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EngagementEffectivenessDashboard;
