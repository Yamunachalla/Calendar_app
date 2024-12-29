import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Import the App component from src/App.jsx
import "./index.css";     // Your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />  {/* Render the imported App component */}
  </React.StrictMode>
);
