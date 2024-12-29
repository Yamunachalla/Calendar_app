import React, { useState } from "react";
import CalendarView from "./components/Calendarview";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard"; // Admin Dashboard
import { format } from "date-fns";

// Hardcoded companies data
const initialCompanies = [
  {
    name: "Company A",
    lastCommunication: "Email - 10th December",
    nextCommunication: "Call - 15th January",
  },
  {
    name: "Company B",
    lastCommunication: "LinkedIn Post - 5th November",
    nextCommunication: "Email - 20th December",
  },
  {
    name: "Company C",
    lastCommunication: "Meeting - 12th October",
    nextCommunication: "Email - 2nd January",
  },
];

const App = () => {
  const [view, setView] = useState("calendar"); // Tracks which view is active: 'calendar', 'dashboard', or 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For authentication state
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [companies, setCompanies] = useState(initialCompanies); // State for companies
  const [communicationsData, setCommunicationsData] = useState([
    {
      company: "Company A",
      type: "Email",
      date: "2024-12-10",
      notes: "Followed up with client regarding proposal.",
    },
    {
      company: "Company A",
      type: "LinkedIn Post",
      date: "2024-12-05",
      notes: "Engaged with client for potential partnership.",
    },
    {
      company: "Company B",
      type: "Meeting",
      date: "2024-12-12",
      notes: "Discussed project timelines and next steps.",
    },
    {
      company: "Company B",
      type: "Email",
      date: "2024-11-20",
      notes: "Scheduled next follow-up meeting with the client.",
    },
    {
      company: "Company C",
      type: "Call",
      date: "2024-11-15",
      notes: "Called client to finalize contract terms.",
    },
  ]);

  const [newCommunication, setNewCommunication] = useState({
    company: "",
    type: "",
    date: "",
    notes: "",
  });

  // Handle changes to communication form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Log new communication
  const logCommunication = () => {
    setCommunicationsData((prev) => [...prev, newCommunication]);
    setNewCommunication({ company: "", type: "", date: "", notes: "" }); // Clear form after submission
  };

  // Handle login for Admin
  const handleLogin = () => {
    // Admin credentials
    const adminCredentials = {
      username: "Yamuna", // Updated username
      password: "Yamuna@1", // Updated password
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true); // Set authentication status
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h1>Company Communication Dashboard</h1>

      {/* Toggle between CalendarView, UserDashboard, and Admin Module */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("calendar")} style={{ padding: "10px" }}>
          Calendar View
        </button>
        <button onClick={() => setView("dashboard")} style={{ padding: "10px" }}>
          Dashboard View
        </button>

        {/* Only show Admin button if not authenticated */}
        {!isAuthenticated && (
          <button onClick={() => setView("admin")} style={{ padding: "10px" }}>
            Admin Module
          </button>
        )}

        {/* Close Admin Module */}
        {isAuthenticated && (
          <button onClick={() => setView("calendar")} style={{ padding: "10px" }}>
            Close Admin Module
          </button>
        )}
      </div>

      {/* Display the Login Form for Admin when Admin Module is clicked */}
      {view === "admin" && !isAuthenticated && (
        <div>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {/* Conditional render of Admin Module after login */}
      {view === "admin" && isAuthenticated && (
        <div>
          <h2>Admin Module</h2>
          <AdminDashboard companies={companies} setCompanies={setCompanies} />
        </div>
      )}

      {/* Display Calendar or User Dashboard based on the state */}
      {view === "calendar" && (
        <div>
          <h2>Calendar View</h2>
          <CalendarView />
        </div>
      )}
      {view === "dashboard" && (
        <div>
          <h2>User Dashboard</h2>
          <UserDashboard companies={companies} communicationsData={communicationsData} />
        </div>
      )}

      {/* Communication Log Form */}
      {view === "dashboard" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Log a Communication</h3>
          <select
            name="company"
            value={newCommunication.company}
            onChange={handleInputChange}
          >
            <option value="">Select Company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="type"
            value={newCommunication.type}
            onChange={handleInputChange}
            placeholder="Communication Type"
          />
          <input
            type="date"
            name="date"
            value={newCommunication.date}
            onChange={handleInputChange}
          />
          <textarea
            name="notes"
            value={newCommunication.notes}
            onChange={handleInputChange}
            placeholder="Add Notes"
          />
          <button onClick={logCommunication}>Log Communication</button>
        </div>
      )}
    </div>
  );
};

export default App;
