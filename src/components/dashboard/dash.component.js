import React, { useEffect, useState } from 'react';
import { getReports } from '../../api/reports.api.js';
import './dash.component.css';

const Dashboard = ({ username, authToken }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
  }, [authToken]);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>
      <div className="reports-section">
        {reports.length > 0 ? (
          <ul>
            {reports.map(report => (
              <li key={report.id}>{report.title}</li>
            ))}
          </ul>
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
