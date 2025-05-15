// EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import QRScanner from './QRScanner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/styles/EmployeeDashboard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 // Helper to Calculate Hours of attendance
    const calculateHours = (checkIn, checkOut) => {
      if (!checkIn || !checkOut) return 0;

      const [h1, m1] = checkIn.split(':').map(Number);
      const [h2, m2] = checkOut.split(':').map(Number);
      const start = h1 * 60 + m1;
      const end = h2 * 60 + m2;
      return ((end - start) / 60).toFixed(2);
    
    }
// Helper to download timesheet csv
const downloadCSV = (data, filename = 'timesheet.csv') => {
  if (!data || ! data.length) return;

  const headers = [ 'Date', 'Check-in', 'Check-out', 'Status', 'Hours Worked'];
  const rows = data.map(entry => [
    new Date(entry.date).toLocaleDateString(),
    entry.check_in || '_',
    entry.check_out || "_",
    entry.status,
    calculateHours(entry.check_in, entry.check_out)
  ]);

  const totalHours = rows.reduce((sum, row) => sum + parseFloat(row[4] || 0), 0).toFixed(2);
  rows.push(['', '', '', 'Total Hours', totalHours]);

  const csvContent = [ headers, ...rows]
    .map(e => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

};

function EmployeeDashboard() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [scanTime, setScanTime] = useState(null);
    const [checkInMessage, setCheckInMessage] = useState('');
    const [timesheet, setTimesheet] = useState('');
    const navigate = useNavigate();
  
    // Store employee data in local storage
    const storedEmployee = JSON.parse(localStorage.getItem('employee'));
    const employeeName = storedEmployee?.name || 'Employee';

    const handleCheckInOut = () => {
      setShowScanner(true);  // Show the QR scanner on button click
    };
  
    const handleScan = async (data) => {
      const expectedQRData = 'INOUTQR_CHECKIN_CODE_2024Q4';
      const token = localStorage.getItem('employeeToken');
    
      if (data !== expectedQRData) {
        toast.error('Invalid QR Code');
        setShowScanner(false);
        return;
      }

      const endpoint = isCheckedIn ? '/api/employee/checkout' : '/api/employee/checkin';

        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
    
          const result = await res.json();
    
          if (res.ok) {
            const now = new Date().toLocaleString();
            setIsCheckedIn(true);
            setScanTime(now);
            setCheckInMessage(
              isCheckedIn 
              ? `You checked out at ${now}`
              : `You checked in at ${now}`
            );
          } else {
           toast.error(result.error || 'Action failed');
          }
        } catch (err) {
          toast.error('Server error');
        
        } finally {
          setShowScanner(false);
        }
    };
  
    useEffect(() => {
      // GET employee details
      const token = localStorage.getItem('employeeToken');

      // Fetch STATUS
      const fetchStatus = async () => {
        try {
          const res = await fetch('/api/employee/status', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            setIsCheckedIn(data.checkedIn);
            setCheckInMessage(data.message || '');
          }
        }  catch(err) {
          toast.error('Failed to load status', err);
        };
      };

      // GET Timesheet
      const fetchTimesheet = async () => {
        try {
          const result = await fetch('/api/employee/timesheet', {
            headers: {
              Authorization : `Bearer ${token}`
            }
          });
          const data = await result.json();
          if(result.ok) {
            setTimesheet(data);
          }
        } catch(err) {
          toast.error('Error fetching the timesheet', err);
        };
      };

      fetchStatus();
      fetchTimesheet();
    }, []);
    
  return (
    <div className="employee-dashboard">
      <header className="dashboard-header">
         <div className="header-inner">
          <Link to="/">
            <img src="/assets/logo.png" alt="InOut QR logo" className="logo" />
          </Link>
          <h1 className="welcome-msg">Welcome {employeeName}</h1>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('employee');
              localStorage.removeItem('employeeToken');
              navigate('/');
            }}
          >
            Logout
          </button>
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
        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {timesheet.length > 0 ? (
                <>
                {timesheet.map((entry, index) => {
                  const hours = calculateHours(entry.check_in, entry.check_out);
                  return (
                  <tr key={index}>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{entry.check_in || '_'}</td>
                    <td>{entry.check_out || '_'}</td>
                    <td>{entry.status}</td>
                    <td>{hours}</td>
                  </tr>
                );
              })}
              <tr style={{fontWeight: 'bold'}}>
                  <td colSpan="4">Total Hours</td>
                  <td>
                    {timesheet
                      .reduce((sum, entry) => {
                        return sum + parseFloat(calculateHours(entry.check_in, entry.check_out));
                      }, 0)
                      .toFixed(2)
                    }
                  </td>
                </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="5">No Records for this month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button onClick={() => downloadCSV(timesheet)}>Download Timesheet</button>
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
