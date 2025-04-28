// EmployeeDashboard.js
import React, { useState } from 'react';
import QRScanner from './QRScanner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/styles/EmployeeDashboard.css';

function EmployeeDashboard() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [scanTime, setScanTime] = useState(null);
    const [checkInMessage, setCheckInMessage] = useState('');
    const navigate = useNavigate();
  
    const handleCheckInOut = () => {
      setShowScanner(true);  // Show the QR scanner on button click
    };
  
    const handleScan = (data) => {
      const expectedQRData = 'INOUTQR_CHECKIN_CODE_2024Q4'; // Static QR data
  
      if (data === expectedQRData) {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString();

        setScanTime(currentTime.toLocaleString());  // Set current time as scan time
        setIsCheckedIn(!isCheckedIn);
        setCheckInMessage(isCheckedIn ? `You checked out at ${formattedTime}` : `You checked in at ${formattedTime}`);
        setShowScanner(false);  // Hide scanner after scanning
      } else {
        alert('Invalid QR Code');
        setShowScanner(false);
      }
    };


  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
        <Link to="/">
            <img src="/assets/logo.png" alt="InOut QR Logo" className="logo" />
        </Link>
        <h1>Employee Dashboard</h1>
        <div className="user-profile">
          <span>Welcome, [Employee Name]</span>
          <div className="profile-options">
            {/* <button>Settings</button>
            <button>Help</button> */}
            <button onClick={() => navigate("/")}>Logout</button>
          </div>
        </div>
      </header>

      <section className="attendance-section">
        <h2>Attendance Tracking</h2>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>{checkInMessage}</p>
        <button onClick={handleCheckInOut}>
          {isCheckedIn ? 'Check Out' : 'Check In'}
        </button>
        
      </section>

      {showScanner && <QRScanner onScan={handleScan} />}

      <section className="timesheet-section">
        <h2>Monthly Timesheet</h2>
        {/* Calendar grid or table would go here */}
        <p>Total Hours: [Calculated Total]</p>
        <button>Download Timesheet</button>
      </section>

      <section className="notifications-section">
        <h2>Notifications</h2>
        <ul>
          <li>New Company Policy Update</li>
          <li>Upcoming Event: Team Building Day</li>
        </ul>
      </section>

      <footer className="dashboard-footer">
        <a href="/support">Help</a> | 
        <a href="/terms">Terms of Service</a> | 
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default EmployeeDashboard;
