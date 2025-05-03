// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeList from './EmployeeList';
import '/public/styles/AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [attendanceLogs, setAttendanceLogs] = useState([]); // Sample state for logs
  const [ summary, setSummary ] = useState({
    totalEmployees: 0,
    present: 0,
    absentees: 0,
    attendanceRate: 0
  });

  const attendanceData = [
    { name: 'Present', value: summary.present },
    {name: 'Absent', value: summary.absentees }
  ];

  const COLORS = ['#28a745', '#dc3545'];
  
  const navigate = useNavigate();
  
  const fetchAttendanceLogs = async () => {
    try {
      const res = await fetch('/api/admin/attendance');
      const data = await res.json();
      setAttendanceLogs(data);
    } catch(err) {
      toast.error("Error Fetching attendance logs");
    };
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/admin/summary');
      const data = await res.json();
      setSummary(data);
    } catch(err) {
      toast.error("Error Fetching Summary");
    };
  };

  useEffect(() => {
    fetchAttendanceLogs();
    fetchSummary();
  }, []);

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
            <p>{summary.totalEmployees}</p>
          </div>
          <div className="stat-item">
            <h3>Today's Attendance</h3>
            <p>{summary.attendanceRate}%</p>
          </div>
          <div className="stat-item">
            <h3>Absentees</h3>
            <p>{summary.absentees}</p>
          </div>
        </div>
      </section>

      {/* Attendance Pie Chart */}
      <section className="overview-chart-section">
        <h2>Attendance Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={attendanceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill ={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            <Tooltip />
            <Legend verticalAlign='bottom' height={36} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Attendance Logs Section */}
      <section className="attendance-logs-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Attendance Logs</h2>
          <button onClick={fetchAttendanceLogs} className="refresh-btn">Refresh</button>
        </div>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Date</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceLogs.length ? (
              attendanceLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.id}</td>
                  <td>{log.name}</td>
                  <td>{log.email}</td>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.check_in}</td>
                  <td>{log.check_out}</td>
                  <td>{log.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No logs available</td>
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
