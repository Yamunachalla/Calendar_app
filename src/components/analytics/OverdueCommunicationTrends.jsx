import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const OverdueCommunicationTrends = () => {
  const data = [
    { date: "2024-12-01", overdue: 5 },
    { date: "2024-12-10", overdue: 10 },
    { date: "2024-12-20", overdue: 8 },
    { date: "2024-12-30", overdue: 12 },
  ];

  return (
    <div>
      <h2>Overdue Communication Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="overdue" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverdueCommunicationTrends;
