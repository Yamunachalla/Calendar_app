Company Communication Web Application

Overview: This web application is designed to manage and track communications with various companies. 
It provides a dashboard for users to view, manage, and log communications, along with notification features for overdue and upcoming tasks. The project is built using React.js.

1.Technologies Used
Frontend:
React.js: JavaScript library for building user interfaces.
React Router: For client-side routing and navigation.
Styled-components: For component-level styling.
Backend:
Node.js: JavaScript runtime for the server-side application.
Express: Framework for handling routes and API requests.
State Management:
React Hooks: For managing state in React components.
useState, useEffect: For tracking and updating data dynamically.
Authentication:
JWT (JSON Web Token): For authentication, allowing secure login and access to the admin module.
Local Storage:Used for storing authentication information and persisting user data across sessions.


2.Setup
1.Download and Install Node.js on your system.
And Ensure that Node.js and npm are installed on your system:
node -v
npm -v
2.Then, install the necessary dependencies
npm install 
3. Running the Application
Start the development server:
npm run dev
Visit the application in your browser:
Open http://localhost:3000.
3.As i used charts and grpahs also so to view that we have to install
npm install chart.js react-chartjs-2

Key Features

1. User Module (Dashboard)
   Communication Management:
   Users can view, manage, and log communications with companies.
   The dashboard displays the last five communications, next scheduled communications, and overdue/due communications.
   Notifications are shown for overdue or upcoming communications, with a badge count indicating the number of due/overdue tasks.
   Interactive Communication Log:
   Users can log a new communication for a company by selecting the type, date, and adding notes.
   Once a new communication is logged, it resets overdue or due highlights for that company.
2. Admin Module (Authentication)
   Admin Authentication:
   JWT-based authentication for the admin module.
   Admins can log in with predefined credentials and access specific functionalities.
3. Reporting and Analytics (Optional)
   Communication Frequency: Displays frequency data of communication types over time (e.g., LinkedIn Post, Email).
   Engagement Effectiveness: Tracks the success rate of different communication methods.
   Overdue Trends: Shows a trendline of overdue communications.
   Downloadable Reports: Exports reports in CSV/PDF format for offline analysis.
   Real-Time Activity Log: Displays the communication activity performed by users.

Testing
Tests have been implemented to ensure the following key functionalities:
Authentication: Ensure that JWT authentication works as expected.
Communication Logging: Verifies that communications can be added and fetched correctly.
Notification System: Ensures the notification count for overdue and due tasks is accurate.
Best Practices Followed
Code Structure: The project is structured into components, pages, and utility files to promote clean, modular, and maintainable code.
Authentication: JWT is used for securing the Admin module and protecting routes.
UI/UX: The dashboard is designed to be user-friendly, showing key information with intuitive navigation.
Error Handling: Proper error handling for invalid inputs, failed communications, etc.
