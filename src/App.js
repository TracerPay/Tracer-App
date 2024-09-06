import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import Sidebar from './components/sidebar/sidebar.component.js';
import Footer from './components/footer/footer.component.js';
import Login from './components/login/login.component.js';
import Signup from './components/signup/signup.component.js';
import Dashboard from './components/dashboard/dash.component.js';
import ReportUpload from './components/report-upload/report-upload.component.js';
import BillingReports from './components/billing-reports/billing-reports.component.js';
import ReportViewer from './components/reportViewer/reportViewer.component.js';
import ARReports from './components/ar-reports/ar-reports.component.js';
import UserSettings from './components/user-settings/user-settings.component.js';
import ManageTeam from './components/manage-team/manage-team.component.js';

import './App.css';

function App() {
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [organizationID, setOrganization] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUsername(decodedToken.username);
        setOrganization(decodedToken.organization);
        setIsAdmin(decodedToken.isAdmin);
        setAuthToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setUsername(null);
    setIsAdmin(false);
    setAuthToken(null);
  };

  return (
    <Router>
      <div className="app-container">
        {username && <Sidebar username={username} isAdmin={isAdmin} onLogout={handleLogout} />}
        <div className="main-content-wrapper"> {/* Added class to ensure sidebar compatibility */}
          <Routes>
            <Route
              path="/"
              element={username ? <Navigate to="/dashboard" /> : <Login setUsername={setUsername} setAuthToken={setAuthToken} />}
            />
            <Route path="/signup" element={<Signup />} />
            {username ? (
              <>
                <Route path="/dashboard" element={<Dashboard organizationID={organizationID} username={username} authToken={authToken} />} />
                <Route path="/admin-dashboard" element={<Dashboard username={username} authToken={authToken} />} />
                <Route path="/upload-report" element={<ReportUpload authToken={authToken} organizationID={organizationID} />} />
                <Route path="/billing-reports" element={<BillingReports authToken={authToken} organizationID={organizationID} />} />
                <Route path="/ar-reports" element={<ARReports authToken={authToken} organizationID={organizationID} />} />
                <Route path="/report/:reportID" element={<ReportViewer authToken={authToken} reportType="billing" />} />
                <Route path='/user-settings/:username' element={<UserSettings organizationID={organizationID} username={username} authToken={authToken} isAdmin={isAdmin} />} />
                <Route path="/manage-team" element={<ManageTeam authToken={authToken} organizationID={organizationID} />} />

              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
      {username && <Footer />}
    </Router>
  );
}

export default App;
