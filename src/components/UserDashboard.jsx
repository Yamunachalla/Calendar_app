import React, { useState } from "react";
import { format } from "date-fns";

const UserDashboard = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [newCommunication, setNewCommunication] = useState({
    type: "",
    date: "",
    notes: "",
  });
  const [hoveredCommunication, setHoveredCommunication] = useState(null); // For hover effect

  // Add new communication
  const handleAddCommunication = () => {
    if (selectedCompany && newCommunication.type && newCommunication.date) {
      setCommunications((prevCommunications) => [
        ...prevCommunications,
        { ...newCommunication, company: selectedCompany },
      ]);
      // Reset communication form
      setNewCommunication({ type: "", date: "", notes: "" });
    }
  };

  // Hover effect for displaying tooltip
  const handleHover = (comm) => {
    setHoveredCommunication(comm);
  };

  const handleLeave = () => {
    setHoveredCommunication(null);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      
      {/* List of companies */}
      <div style={{ marginBottom: "20px" }}>
        {companies.map((company) => (
          <div
            key={company.name}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor:
                selectedCompany === company.name ? "#f0f0f0" : "white",
            }}
            onClick={() => setSelectedCompany(company.name)}
          >
            <h3>{company.name}</h3>
            <div>
              Last Communication: {company.lastCommunication || "No communication"}
            </div>
            <div>
              Next Communication: {company.nextCommunication || "No scheduled communication"}
            </div>
          </div>
        ))}
      </div>

      {/* Communication history and adding new communication */}
      {selectedCompany && (
        <div>
          <h3>Communications for {selectedCompany}</h3>

          {/* Add New Communication */}
          <button onClick={handleAddCommunication}>
            Add New Communication
          </button>

          {/* Communication form */}
          <div>
            <input
              type="text"
              placeholder="Communication Type"
              value={newCommunication.type}
              onChange={(e) =>
                setNewCommunication({ ...newCommunication, type: e.target.value })
              }
            />
            <input
              type="date"
              value={newCommunication.date}
              onChange={(e) =>
                setNewCommunication({ ...newCommunication, date: e.target.value })
              }
            />
            <textarea
              placeholder="Add Notes"
              value={newCommunication.notes}
              onChange={(e) =>
                setNewCommunication({ ...newCommunication, notes: e.target.value })
              }
            />
          </div>

          {/* Communication History Table */}
          <div style={{ marginTop: "20px" }}>
            <h4>Communication History</h4>
            {communications
              .filter((comm) => comm.company === selectedCompany)
              .map((comm, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleHover(comm)}
                  onMouseLeave={handleLeave}
                >
                  <div><strong>{comm.type}</strong></div>
                  <div>{format(new Date(comm.date), "dd/MM/yyyy")}</div>
                  <div>{comm.notes}</div>

                  {hoveredCommunication === comm && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "5px",
                        borderRadius: "3px",
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {comm.notes}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
