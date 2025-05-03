// AdminDashboard.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList'; // ✅ 1. Import the new component
import '/public/styles/AdminDashboard.css';

function AdminDashboard() {
  const [attendanceLogs, setAttendanceLogs] = useState([]); // Sample state for logs
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <header className="admin-header">
        <Link to="/">
            <img src="/assets/logo.png" alt="InOut QR logo" className="logo"/>
        </Link>
        <h1>Welcome, Admin</h1>
        <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
      </header>

      {/* Overview Section */}
      <section className="overview-section">
        <h2>Dashboard Overview</h2>
        <div className="stats">
          <div className="stat-item">
            <h3>Total Employees</h3>
            <p>25</p>
          </div>
          <div className="stat-item">
            <h3>Today's Attendance</h3>
            <p>80%</p>
          </div>
          <div className="stat-item">
            <h3>Absentees</h3>
            <p>5</p>
          </div>
        </div>
      </section>

      {/* Attendance Logs Section */}
      <section className="attendance-logs-section">
        <h2>Attendance Logs</h2>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceLogs.length ? (
              attendanceLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.name}</td>
                  <td>{log.checkIn}</td>
                  <td>{log.checkOut}</td>
                  <td>{log.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No logs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Employee Management Section */}
      <section className="employee-management-section">
        <h2>Manage Employees</h2>
        <EmployeeList /> {/* ✅ 2. Render it here */}
      </section>

      {/* QR Code Management Section */}
      <section className="qr-management-section">
        <h2>QR Code Management</h2>
        <p>Current QR Code: <span>INOUTQR_CHECKIN_CODE_2024Q4</span></p>
        <button className="generate-qr-btn">Generate New QR Code</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
