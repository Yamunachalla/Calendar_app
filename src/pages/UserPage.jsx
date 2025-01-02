import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
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
        { type: "LinkedIn Post", date: "2024-12-25T23:30", notes: "Shared case study", completed: false },
      ],
      nextCommunication: { type: "Meeting", date: "2025-01-05" },
    },
    {
      id: 2,
      name: "Company B",
      communications: [
        { type: "Email", date: "2024-12-10", notes: "Initial outreach", completed: true },
        { type: "Call", date: "2024-12-18", notes: "Discussed pricing", completed: true },
        { type: "Meeting", date: "2024-12-30T10:00", notes: "Demo scheduled", completed: false },
      ],
      nextCommunication: { type: "Follow-up Call", date: "2025-01-02" },
    },
  ]);

  const [todaysCount, setTodaysCount] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Function to calculate today's communications dynamically
  const calculateTodaysCount = () => {
    const startOfToday = dayjs().startOf("day");
    const endOfToday = dayjs().endOf("day");

    const count = companies.reduce((acc, company) => {
      return (
        acc +
        company.communications.filter((comm) => {
          const commDate = dayjs(comm.date);
          return (
            commDate.isAfter(startOfToday) &&
            commDate.isBefore(endOfToday) &&
            !comm.completed
          );
        }).length
      );
    }, 0);

    setTodaysCount(count);
  };

  // Recalculate today's communications on companies update
  useEffect(() => {
    calculateTodaysCount();
  }, [companies]);

  const handleAddCommunication = (companyId, newCommunication) => {
    const startOfToday = dayjs().startOf("day");
    const endOfToday = dayjs().endOf("day");

    const formattedNewCommunication = {
      ...newCommunication,
      date: dayjs(newCommunication.date).format("YYYY-MM-DDTHH:mm"), // Keep full date-time format
    };

    setCompanies((prev) => {
      const updatedCompanies = prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              communications: [...company.communications, formattedNewCommunication],
            }
          : company
      );

      // Check if the new communication is for today
      const newCommDate = dayjs(formattedNewCommunication.date);
      if (
        newCommDate.isAfter(startOfToday) &&
        newCommDate.isBefore(endOfToday) &&
        !formattedNewCommunication.completed
      ) {
        setTodaysCount((prevCount) => prevCount + 1);
      }

      return updatedCompanies;
    });
  };
console.log(todaysCount);
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>
      <NotificationPanel
        overdueCount={companies.filter((company) =>
          company.communications.some(
            (comm) => dayjs(comm.date).isBefore(dayjs(), "day") && !comm.completed
          )
        ).length}
        todaysCount={todaysCount}
        overdueData={companies.filter((company) =>
          company.communications.some(
            (comm) => dayjs(comm.date).isBefore(dayjs(), "day") && !comm.completed
          )
        )}
        todaysData={companies.filter((company) =>
          company.communications.some((comm) => {
            const commDate = dayjs(comm.date);
            return (
              commDate.isAfter(dayjs().startOf("day")) &&
              commDate.isBefore(dayjs().endOf("day")) &&
              !comm.completed
            );
          })
        )}
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