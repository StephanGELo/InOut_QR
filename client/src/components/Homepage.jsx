// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <Link to="/">
          <img src="/assets/logo.png" alt="InOut QR Logo" className="logo" />
        </Link>
        <h1>Welcome to InOut QR</h1>
        <p>Simplifying Employee Attendance and Timesheet Management</p>
      </header>

      <div className="login-options">
        <h2>Select Your Role</h2>
        <Link to="/employee-login" className="btn">Employee Login</Link>
        <Link to="/admin-login" className="btn">Admin Login</Link>
      </div>

      <section className="features">
        <h2>App Features</h2>
        <ul>
          <li>Scan to Check In & Out</li>
          <li>Real-Time Attendance Tracking</li>
          <li>Monthly Timesheet Generation</li>
          <li>Admin Dashboard for Full Control</li>
        </ul>
      </section>

      <section className="qr-info">
        <h3>How to Check In & Out</h3>
        <p>Scan the QR code provided by your organization to check in at the start of your shift and out when you leave.</p>
        {/* Example image of QR code scan */}
        <img src="/qr-demo.png" alt="QR Code Demo" className="qr-demo" />
      </section>

      <footer className="footer">
        <p>
          <Link to="/contact">Contact Support</Link> | 
          <Link to="/terms">Terms of Service</Link> | 
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}

export default Homepage;

  