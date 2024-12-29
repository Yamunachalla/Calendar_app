import React, { useState } from "react";

const AdminDashboard = ({ companies, setCompanies }) => {
  // State for managing communication methods
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Other communication methods", sequence: 5, mandatory: false },
  ]);

  // State for new communication method
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  // State for new company
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedinProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  // Add new company
  const addCompany = () => {
    setCompanies((prev) => [...prev, newCompany]);
    setNewCompany({
      name: "",
      location: "",
      linkedinProfile: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      periodicity: "",
    });
  };

  // Add new communication method
  const addCommunicationMethod = () => {
    setCommunicationMethods((prev) => [...prev, { ...newMethod, sequence: Number(newMethod.sequence) }]);
    setNewMethod({
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
  };

  // Remove a communication method
  const removeCommunicationMethod = (index) => {
    setCommunicationMethods((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Company Management Section */}
      <div>
        <h3>Company Management</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newCompany.location}
            onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="LinkedIn Profile"
            value={newCompany.linkedinProfile}
            onChange={(e) => setNewCompany({ ...newCompany, linkedinProfile: e.target.value })}
          />
          <input
            type="text"
            placeholder="Emails (comma-separated)"
            value={newCompany.emails}
            onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Numbers (comma-separated)"
            value={newCompany.phoneNumbers}
            onChange={(e) => setNewCompany({ ...newCompany, phoneNumbers: e.target.value })}
          />
          <textarea
            placeholder="Comments"
            value={newCompany.comments}
            onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
          />
          <input
            type="text"
            placeholder="Communication Periodicity (e.g., every 2 weeks)"
            value={newCompany.periodicity}
            onChange={(e) => setNewCompany({ ...newCompany, periodicity: e.target.value })}
          />
          <button onClick={addCompany}>Add Company</button>
        </div>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              {company.name} - {company.location}
            </li>
          ))}
        </ul>
      </div>

      {/* Communication Method Management Section */}
      <div>
        <h3>Communication Method Management</h3>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newMethod.name}
            onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMethod.description}
            onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Sequence"
            value={newMethod.sequence}
            onChange={(e) => setNewMethod({ ...newMethod, sequence: e.target.value })}
          />
          <label>
            Mandatory:
            <input
              type="checkbox"
              checked={newMethod.mandatory}
              onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
            />
          </label>
          <button onClick={addCommunicationMethod}>Add Method</button>
        </div>
        <ul>
          {communicationMethods
            .sort((a, b) => a.sequence - b.sequence)
            .map((method, index) => (
              <li key={index}>
                {method.name} - {method.description} (Sequence: {method.sequence}, Mandatory:{" "}
                {method.mandatory ? "Yes" : "No"})
                <button onClick={() => removeCommunicationMethod(index)}>Remove</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
