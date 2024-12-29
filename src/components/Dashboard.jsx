// src/components/Dashboard.jsx
import React from 'react';
import { format } from 'date-fns';

const Dashboard = ({ companies, onSelectCompany }) => {
  const getHighlightColor = (status) => {
    if (status === 'overdue') return 'red';
    if (status === 'dueToday') return 'yellow';
    return 'white';
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {companies.map((company) => (
          <div key={company.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <h3>{company.name}</h3>
            <div>
              <strong>Last 5 Communications:</strong>
              {company.communications.slice(0, 5).map((comm, index) => (
                <div key={index}>
                  <span>{comm.type} - {format(new Date(comm.date), 'dd MMMM yyyy')}</span>
                </div>
              ))}
            </div>
            <div>
              <strong>Next Scheduled Communication:</strong>
              <div style={{ backgroundColor: getHighlightColor(company.status) }}>
                {company.nextCommunication && (
                  <span>
                    {company.nextCommunication.type} - {format(new Date(company.nextCommunication.date), 'dd MMMM yyyy')}
                  </span>
                )}
              </div>
            </div>
            <button onClick={() => onSelectCompany(company.id)}>Select Company</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
