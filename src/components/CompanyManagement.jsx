import React, { useState } from "react";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([
    {
      name: "Company A",
      location: "New York",
      linkedin: "https://linkedin.com/company/a",
      emails: ["contact@companya.com"],
      phoneNumbers: ["123-456-7890"],
      comments: "Important client.",
      communicationPeriodicity: "2 weeks",
    },
    {
      name: "Company B",
      location: "California",
      linkedin: "https://linkedin.com/company/b",
      emails: ["contact@companyb.com"],
      phoneNumbers: ["987-654-3210"],
      comments: "Prospective client.",
      communicationPeriodicity: "1 month",
    },
  ]);

  const [newCompany, setNewCompany] = useState({
    name: "",
    location: "",
    linkedin: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "2 weeks",
  });

  const [isEditing, setIsEditing] = useState(false); // Track if we are editing an existing company
  const [editIndex, setEditIndex] = useState(null); // Track the index of the company being edited

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new company or update an existing company
  const saveCompany = () => {
    if (isEditing) {
      // Update the company at the edit index
      const updatedCompanies = [...companies];
      updatedCompanies[editIndex] = newCompany;
      setCompanies(updatedCompanies);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add a new company
      setCompanies((prev) => [...prev, newCompany]);
    }

    // Clear the form
    setNewCompany({
      name: "",
      location: "",
      linkedin: "",
      emails: "",
      phoneNumbers: "",
      comments: "",
      communicationPeriodicity: "2 weeks",
    });
  };

  // Handle editing a company
  const editCompany = (index) => {
    setNewCompany(companies[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Handle deleting a company
  const deleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  return (
    <div>
      <h2>Manage Companies</h2>

      {/* Form to add or edit a company */}
      <div>
        <h3>{isEditing ? "Edit Company" : "Add a New Company"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newCompany.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={newCompany.linkedin}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="emails"
          placeholder="Emails (comma separated)"
          value={newCompany.emails}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumbers"
          placeholder="Phone Numbers (comma separated)"
          value={newCompany.phoneNumbers}
          onChange={handleInputChange}
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={newCompany.comments}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="communicationPeriodicity"
          placeholder="Communication Periodicity (e.g., 2 weeks)"
          value={newCompany.communicationPeriodicity}
          onChange={handleInputChange}
        />
        <button onClick={saveCompany}>
          {isEditing ? "Update Company" : "Add Company"}
        </button>
      </div>

      {/* Display companies list */}
      <h3>Company List</h3>
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            <strong>{company.name}</strong> - {company.location} -{" "}
            <a href={company.linkedin}>LinkedIn</a> <br />
            Emails: {company.emails.join(", ")} <br />
            Phone Numbers: {company.phoneNumbers.join(", ")} <br />
            Comments: {company.comments} <br />
            Communication Periodicity: {company.communicationPeriodicity}
            <br />
            <button onClick={() => editCompany(index)}>Edit</button>
            <button onClick={() => deleteCompany(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyManagement;
