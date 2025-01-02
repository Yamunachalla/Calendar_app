import React from "react";

const DownloadableReports = () => {
  const handleDownload = (type) => {
    alert(`Download ${type} report triggered!`);
    // Add actual report generation logic here
  };

  return (
    <div>
      <h2>Downloadable Reports</h2>
      <button onClick={() => handleDownload("PDF")} style={buttonStyle}>
        Download PDF
      </button>
      <button onClick={() => handleDownload("CSV")} style={buttonStyle}>
        Download CSV
      </button>
    </div>
  );
};

const buttonStyle = {
  margin: "5px",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DownloadableReports;
