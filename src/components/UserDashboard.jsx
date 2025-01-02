import React, { useState } from "react";

const UserDashboard = ({ companies }) => {
  const [newCommunication, setNewCommunication] = useState({
    company: "",
    type: "",
    date: "",
    notes: "",
  });

  const handleAddCommunication = () => {
    if (
      !newCommunication.company ||
      !newCommunication.type ||
      !newCommunication.date ||
      !newCommunication.notes
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Here you would normally add the new communication to your data state
    alert("Communication added successfully.");
  };

  // Hardcoded Communications Data for demonstration
  const communicationsData = [
    {
      company: "Company A",
      communications: [
        { type: "Email", date: "2024-12-28", notes: "Follow-up email sent." },
        { type: "LinkedIn Post", date: "2024-12-26", notes: "Initial contact." },
        { type: "Phone Call", date: "2024-12-20", notes: "Discussed project." },
        { type: "Email", date: "2024-12-18", notes: "Meeting reminder." },
        { type: "LinkedIn Message", date: "2024-12-15", notes: "Connection request." },
      ],
    },
    {
      company: "Company B",
      communications: [
        { type: "LinkedIn Post", date: "2024-12-29", notes: "Introduced product." },
        { type: "Phone Call", date: "2024-12-22", notes: "Client query discussed." },
        { type: "Email", date: "2024-12-19", notes: "Sent proposal." },
        { type: "LinkedIn Message", date: "2024-12-17", notes: "Follow-up on message." },
        { type: "Email", date: "2024-12-10", notes: "Initial contact." },
      ],
    },
    {
      company: "Company C",
      communications: [
        { type: "Phone Call", date: "2024-12-30", notes: "Follow-up call." },
        { type: "LinkedIn Post", date: "2024-12-27", notes: "Shared industry article." },
        { type: "Email", date: "2024-12-23", notes: "Reminder about meeting." },
        { type: "Email", date: "2024-12-18", notes: "Proposal sent." },
        { type: "LinkedIn Message", date: "2024-12-14", notes: "Contact initiated." },
      ],
    },
    {
      company: "Company D",
      communications: [
        { type: "Phone Call", date: "2024-12-25", notes: "Discussed contract terms." },
        { type: "Email", date: "2024-12-22", notes: "Contract sent for review." },
        { type: "LinkedIn Message", date: "2024-12-19", notes: "Initial connection." },
        { type: "LinkedIn Post", date: "2024-12-17", notes: "Product update shared." },
        { type: "Email", date: "2024-12-10", notes: "Introduced new service." },
      ],
    },
  ];

  const getLastFiveCommunications = (companyName) => {
    const companyData = communicationsData.find(
      (data) => data.company === companyName
    );
    return companyData ? companyData.communications.slice(-5) : [];
  };

  return (
    <div>
      <h2>Company Communications</h2>

      <div>
        {companies.map((company, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{company.name}</h3>
            <h4>Last 5 Communications</h4>
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
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {getLastFiveCommunications(company.name).map((comm, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        position: "relative",
                      }}
                      title={comm.notes}
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

            {/* Add Communication Form */}
            <div style={{ marginTop: "20px" }}>
              <h4>Add New Communication</h4>
              <form>
                <label>
                  Communication Type:
                  <select
                    value={newCommunication.type}
                    onChange={(e) =>
                      setNewCommunication({ ...newCommunication, type: e.target.value })
                    }
                    style={{ padding: "5px", margin: "5px" }}
                  >
                    <option value="">Select</option>
                    <option value="LinkedIn Post">LinkedIn Post</option>
                    <option value="Email">Email</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="LinkedIn Message">LinkedIn Message</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <br />
                <label>
                  Date:
                  <input
                    type="date"
                    value={newCommunication.date}
                    onChange={(e) =>
                      setNewCommunication({ ...newCommunication, date: e.target.value })
                    }
                    style={{ padding: "5px", margin: "5px" }}
                  />
                </label>
                <br />
                <label>
                  Notes:
                  <textarea
                    value={newCommunication.notes}
                    onChange={(e) =>
                      setNewCommunication({ ...newCommunication, notes: e.target.value })
                    }
                    style={{ padding: "5px", margin: "5px", width: "100%" }}
                  />
                </label>
                <br />
                <button
                  type="button"
                  onClick={handleAddCommunication}
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add Communication
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
