import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CommunicationFrequencyChart = () => {
  const data = [
    { method: "Email", count: 12 },
    { method: "Phone Call", count: 8 },
    { method: "LinkedIn Post", count: 15 },
    { method: "SMS", count: 5 },
  ];

  return (
    <div>
      <h2>Communication Frequency</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="method" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommunicationFrequencyChart;
