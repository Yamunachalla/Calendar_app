import React, { useState } from "react";

const CompanyManagement = ({ companies, onAddOrUpdate, onDelete }) => {
  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedin: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "",
  });

  const handleAddOrUpdateCompany = () => {
    if (!newCompany.name || !newCompany.location) {
      alert("Please fill out the required fields.");
      return;
    }
    onAddOrUpdate(newCompany);
    setNewCompany({
      name: "",
      location: "",
      linkedin: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      communicationPeriodicity: "",
    });
  };

  const handleDeleteCompany = (name) => {
    onDelete(name);
  };

  const handleChange = (e) => {
    setNewCompany({
      ...newCompany,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h4>Add or Update Company</h4>
      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={newCompany.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={newCompany.location}
        onChange={handleChange}
      />
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn Profile"
        value={newCompany.linkedin}
        onChange={handleChange}
      />
      <input
        type="text"
        name="emails"
        placeholder="Emails"
        value={newCompany.emails}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phoneNumbers"
        placeholder="Phone Numbers"
        value={newCompany.phoneNumbers}
        onChange={handleChange}
      />
      <textarea
        name="comments"
        placeholder="Comments"
        value={newCompany.comments}
        onChange={handleChange}
      />
      <input
        type="text"
        name="communicationPeriodicity"
        placeholder="Communication Periodicity"
        value={newCompany.communicationPeriodicity}
        onChange={handleChange}
      />
      <button onClick={handleAddOrUpdateCompany}>Add/Update Company</button>

      <h4>Existing Companies</h4>
      {companies.map((company, index) => (
        <div key={index}>
          <h5>{company.name}</h5>
          <p>{company.location}</p>
          <button onClick={() => handleDeleteCompany(company.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CompanyManagement;
