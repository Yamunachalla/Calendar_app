import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OverdueCommunicationTrends = ({ communications }) => {
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    // Generate the chart data
    const overdueCommunications = {};
    
    // Group communications by company
    communications.forEach((com) => {
      const company = com.company;
      const dueDate = new Date(com.dueDate); // Due date of the communication
      const today = new Date();
      if (today > dueDate) {
        const dateKey = dueDate.toISOString().split("T")[0]; // Use YYYY-MM-DD format
        if (!overdueCommunications[company]) {
          overdueCommunications[company] = {};
        }
        if (!overdueCommunications[company][dateKey]) {
          overdueCommunications[company][dateKey] = 0;
        }
        overdueCommunications[company][dateKey]++;
      }
    });

    // Prepare data for the chart
    const companies = Object.keys(overdueCommunications);
    const dates = [...new Set(Object.values(overdueCommunications).flatMap((com) => Object.keys(com)))];

    const datasets = companies.map((company) => ({
      label: company,
      data: dates.map((date) => overdueCommunications[company][date] || 0),
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    }));

    setChartData({
      labels: dates,
      datasets,
    });
  }, [communications]);

  return (
    <div>
      <h3>Overdue Communication Trends</h3>
      <Line data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: "Overdue Communications by Company" } } }} />
    </div>
  );
};

export default OverdueCommunicationTrends;
