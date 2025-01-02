import React, { useState } from "react";
import DashboardGrid from "../components/DashboardGrid";
import NotificationPanel from "../components/NotificationPanel";
import ActionModal from "../components/ActionModal";

const UserPage = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Company A",
      communications: [
        { type: "Email", date: "2024-12-15", notes: "Follow-up email", completed: true },
        { type: "Call", date: "2024-12-20", notes: "Discussion on product updates", completed: true },
        { type: "LinkedIn Post", date: "2024-12-25", notes: "Shared case study", completed: false },
      ],
      nextCommunication: { type: "Meeting", date: "2025-01-05" },
    },
    {
      id: 2,
      name: "Company B",
      communications: [
        { type: "Email", date: "2024-12-10", notes: "Initial outreach", completed: true },
        { type: "Call", date: "2024-12-18", notes: "Discussed pricing", completed: true },
        { type: "Meeting", date: "2024-12-30", notes: "Demo scheduled", completed: false },
      ],
      nextCommunication: { type: "Follow-up Call", date: "2025-01-02" },
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Derived data for notifications
  const overdueCommunications = companies.filter((company) =>
    company.communications.some((comm) => new Date(comm.date) < new Date() && !comm.completed)
  );

  const todaysCommunications = companies.filter((company) =>
    company.communications.some((comm) =>
      new Date(comm.date).toDateString() === new Date().toDateString() && !comm.completed
    )
  );

  const handleAddCommunication = (companyId, newCommunication) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              communications: [...company.communications, newCommunication],
            }
          : company
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>
      <NotificationPanel
        overdueCount={overdueCommunications.length}
        todaysCount={todaysCommunications.length}
        overdueData={overdueCommunications}
        todaysData={todaysCommunications}
      />
      <DashboardGrid
        companies={companies}
        onActionClick={(company) => {
          setSelectedCompany(company);
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <ActionModal
          company={selectedCompany}
          onClose={() => setModalOpen(false)}
          onSave={(newComm) => {
            handleAddCommunication(selectedCompany.id, newComm);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserPage;
