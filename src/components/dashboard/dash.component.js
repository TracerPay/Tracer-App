import React, { useEffect, useState } from 'react';
import { getReports } from '../../api/reports.api.js';
import './dash.component.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ organizationID, username, authToken }) => {
  const [recentTransactions, setRecentTransactions] = useState(null); // Set to null initially
  const [recentBilled, setRecentBilled] = useState(null); // Set to null initially
  const [reportMonth, setReportMonth] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const fetchedReports = await getReports(organizationID, 'ar', authToken);
  
      if (fetchedReports.length > 0) {
        // Find the most recent report based on the 'month' field
        const mostRecentReport = fetchedReports.reduce((latest, current) => {
          const currentDate = new Date(current.month);
          const latestDate = new Date(latest.month);
          return currentDate > latestDate ? current : latest;
        });
  
        // Calculate total transactions and total billed
        const totalTransactions = mostRecentReport.reportData.reduce((acc, row) => acc + row.lineItemQuantity, 0);
        const totalBilled = parseFloat(
          mostRecentReport.reportData.reduce((acc, row) => acc + parseFloat(row.lineItemPrice), 0).toFixed(2)
        );
  
        // Update state with the most recent report's metrics and month
        setRecentTransactions(totalTransactions);
        setRecentBilled(totalBilled);
        setReportMonth(mostRecentReport.month);

        // Store the data in localStorage to persist across navigation
        localStorage.setItem('recentTransactions', totalTransactions);
        localStorage.setItem('recentBilled', totalBilled);
        localStorage.setItem('reportMonth', mostRecentReport.month);
      }
      setLoading(false); // Stop loading after fetching
    };
  
    fetchReports();
  }, [authToken, organizationID]);

  // Function to navigate to the report upload component
  const handleUploadClick = () => {
    navigate('/upload-report');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>

      {loading ? (
        <p>Loading statistics...</p> // Show a loading state while fetching
      ) : (
        <>
          {reportMonth && <h2>Statistics for {reportMonth}</h2>} {/* Display the month */}

          <div className="metrics-section">
            <div className="metric">
              <h3>Total Transactions</h3>
              <p>{recentTransactions !== null ? recentTransactions : 'N/A'}</p> {/* Show N/A if null */}
            </div>
            <div className="metric">
              <h3>Total Billed</h3>
              <p>{recentBilled !== null ? `$${recentBilled}` : 'N/A'}</p> {/* Show N/A if null */}
            </div>
          </div>
        </>
      )}

      <div className="upload-section">
        <h2>Upload a New Report</h2>
        <button onClick={handleUploadClick}>Go to Report Upload</button> {/* Button to navigate to upload */}
      </div>
    </div>
  );
};

export default Dashboard;
