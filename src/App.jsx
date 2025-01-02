import React, { useState } from "react";
import CalendarView from "./components/Calendarview";
import UserPage from "./pages/UserPage"; // Ensure this path is correct
import AdminPage from "./pages/AdminPage";
import ReportingPage from "./pages/ReportingPage"; // Ensure this path is correct

const App = () => {
  const [view, setView] = useState(""); // Empty initially to show the welcome screen
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Mock data for companies and communications
  const [communicationsData, setCommunicationsData] = useState([
    { company: "Company A", type: "LinkedIn Post", date: "2024-12-28", notes: "Initial contact." },
    { company: "Company B", type: "Email", date: "2024-12-29", notes: "Follow-up." },
  ]);

  const [overdueCommunications, setOverdueCommunications] = useState([
    { company: "Company A", date: "2024-12-26" },
  ]);

  const [todaysCommunications, setTodaysCommunications] = useState([]);

  const notificationCount =
    overdueCommunications.length + todaysCommunications.length;

  const handleLogin = () => {
    const adminCredentials = {
      username: "Yamuna",
      password: "Yamuna@1",
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  // Function to handle adding a new communication
  const addCommunication = (newCommunication) => {
    setCommunicationsData((prev) => [...prev, newCommunication]);

    const today = new Date().toISOString().split("T")[0];
    if (newCommunication.date === today) {
      setTodaysCommunications((prev) => [...prev, newCommunication]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#e0f7fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          width: "100%",
          background: "#4CAF50",
          padding: "10px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0" }}>Company Communication Dashboard</h1>
        <nav style={{ marginTop: "10px" }}>
          <button onClick={() => setView("")} style={navButtonStyle}>
            Home
          </button>
          <button onClick={() => setView("calendar")} style={navButtonStyle}>
            Calendar View
          </button>
          <button onClick={() => setView("user")} style={navButtonStyle}>
            User Module
            {notificationCount > 0 && (
              <span
                style={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 8px",
                  marginLeft: "5px",
                  fontSize: "0.8rem",
                }}
              >
                {notificationCount}
              </span>
            )}
          </button>
          <button onClick={() => setView("reporting")} style={navButtonStyle}>
            Reporting & Analytics
          </button>
          {!isAuthenticated ? (
            <button onClick={() => setView("admin")} style={navButtonStyle}>
              Admin Module
            </button>
          ) : (
            <button
              onClick={() => {
                setView("");
                setIsAuthenticated(false);
              }}
              style={navButtonStyle}
            >
              Logout Admin
            </button>
          )}
        </nav>
      </header>

      <main style={{ flex: 1, padding: "20px", background: "#ffffff" }}>
        {view === "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <h2>Welcome to the Calendar Application</h2>
            <p>Manage your communications, view calendar events, and access dashboards.</p>
          </div>
        )}
        {view === "calendar" && <CalendarView />}
        {view === "user" && (
          <UserPage
            communicationsData={communicationsData}
            overdueCommunications={overdueCommunications}
            todaysCommunications={todaysCommunications}
            addCommunication={addCommunication}
          />
        )}
        {view === "reporting" && (
          <ReportingPage
            communicationsData={communicationsData}
          />
        )}
        {view === "admin" && !isAuthenticated && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h2>Admin Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ margin: "10px", padding: "10px", width: "100%" }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: "10px", padding: "10px", width: "100%" }}
              />
              <button onClick={handleLogin} style={{ padding: "10px", width: "100%" }}>
                Login
              </button>
            </div>
          </div>
        )}
        {view === "admin" && isAuthenticated && <AdminPage />}
      </main>
    </div>
  );
};

const navButtonStyle = {
  margin: "0 5px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#ffffff",
  color: "#4CAF50",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default App;
