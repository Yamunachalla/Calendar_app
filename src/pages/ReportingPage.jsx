import React from "react";
import CommunicationFrequencyChart from "../components/analytics/CommunicationFrequencyChart";
import EngagementEffectivenessDashboard from "../components/analytics/EngagementEffectivenessDashboard";
import OverdueCommunicationTrends from "../components/analytics/OverdueCommunicationTrends";
import RealTimeActivityLog from "../components/analytics/RealTimeActivityLog";
import DownloadableReports from "../components/analytics/DownloadableReports";

const ReportingPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Reporting and Analytics</h1>
      <div style={{ marginBottom: "20px" }}>
        <CommunicationFrequencyChart />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <EngagementEffectivenessDashboard />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <OverdueCommunicationTrends />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <RealTimeActivityLog />
      </div>
      <div>
        <DownloadableReports />
      </div>
    </div>
  );
};

export default ReportingPage;
