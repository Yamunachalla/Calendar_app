import React, { useState } from "react";
import CompanyManagement from "../components/CompanyManagement";
import CommunicationMethodManagement from "../components/CommunicationMethodManagement";

const AdminPage = () => {
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Send a message on LinkedIn", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email to the company", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company representative", sequence: 4, mandatory: false },
    { name: "Other", description: "Any other form of communication", sequence: 5, mandatory: false },
  ]);

  const addOrUpdateCompany = (newCompany) => {
    const updatedCompanies = companies.filter((c) => c.name !== newCompany.name);
    setCompanies([...updatedCompanies, newCompany]);
  };

  const deleteCompany = (name) => {
    setCompanies(companies.filter((c) => c.name !== name));
  };

  const addOrUpdateMethod = (newMethod) => {
    const updatedMethods = communicationMethods.filter((m) => m.name !== newMethod.name);
    setCommunicationMethods([...updatedMethods, newMethod]);
  };

  const deleteMethod = (name) => {
    setCommunicationMethods(communicationMethods.filter((m) => m.name !== name));
  };

  return (
    <div>
      <h1>Admin Module</h1>
      <CompanyManagement
        companies={companies}
        onAddOrUpdate={addOrUpdateCompany}
        onDelete={deleteCompany}
      />
      <CommunicationMethodManagement
        methods={communicationMethods}
        onAddOrUpdate={addOrUpdateMethod}
        onDelete={deleteMethod}
      />
    </div>
  );
};

export default AdminPage;
