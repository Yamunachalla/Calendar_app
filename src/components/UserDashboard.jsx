import React from "react";

const UserDashboard = ({ companies, communicationsData }) => {
  return (
    <div>
      <h2>Company Communications</h2>
      <div>
        {companies.map((company, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{company.name}</h3>
            <table
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Communication Type</th>
                  <th>Date</th>
                  <th>Notes</th> {/* Add Notes Column */}
                </tr>
              </thead>
              <tbody>
                {communicationsData
                  .filter((comm) => comm.company === company.name) // Filter communications by company
                  .map((comm, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          position: "relative",
                        }}
                        title={comm.notes} // Tooltip appears here on hover
                      >
                        {comm.type}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {comm.date}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {comm.notes}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
