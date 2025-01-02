import React from "react";
import TooltipComponent from "./TooltipComponent";

const DashboardGrid = ({ companies, onActionClick }) => {
  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Last 5 Communications</th>
            <th>Next Scheduled Communication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            const isOverdue = company.communications.some(
              (comm) => new Date(comm.date) < new Date() && !comm.completed
            );
            const isDueToday = company.communications.some(
              (comm) =>
                new Date(comm.date).toDateString() === new Date().toDateString() && !comm.completed
            );

            return (
              <tr
                key={company.id}
                style={{
                  backgroundColor: isOverdue ? "#ffcccc" : isDueToday ? "#fff3cd" : "white",
                }}
              >
                <td>{company.name}</td>
                <td>
                  {company.communications
                    .slice(-5)
                    .map((comm, index) => (
                      <TooltipComponent key={index} comm={comm}>
                        <p>
                          {comm.type} - {new Date(comm.date).toLocaleDateString()}
                        </p>
                      </TooltipComponent>
                    ))}
                </td>
                <td>
                  {company.nextCommunication
                    ? `${company.nextCommunication.type} - ${new Date(
                        company.nextCommunication.date
                      ).toLocaleDateString()}`
                    : "N/A"}
                </td>
                <td>
                  <button onClick={() => onActionClick(company)}>Log Communication</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardGrid;
