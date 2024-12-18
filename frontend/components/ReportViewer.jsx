import React, { useState, useEffect } from 'react';
import { getReport } from '../utils/api'; // Assuming you've created an api.js utility file for handling requests
import styles from '../styles/ReportViewer.module.css';

function ReportViewer({ reportId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport(reportId);
        setReport(data);
      } catch (err) {
        setError('Failed to load report');
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleDownload = () => {
    window.location.href = `/api/reports/${reportId}/download`; // Adjust the URL to match your backend endpoint
  };

  if (loading) {
    return <div>Loading report...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!report) {
    return <div>No report found</div>;
  }

  return (
    <div className={styles.reportViewerContainer}>
      <h1>{report.title}</h1>
      <div className={styles.reportContent}>
        <p>{report.content}</p>
        <button className={styles.downloadButton} onClick={handleDownload}>
          Download Report
        </button>
      </div>
    </div>
  );
}

export default ReportViewer;
s