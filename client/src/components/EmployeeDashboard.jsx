// EmployeeDashboard.js
import React, { useState, useEffect } from 'react';
import QRScanner from './QRScanner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../public/styles/EmployeeDashboard.css';
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
    if (!data || (typeof data === 'object' && !data.text)) return; // 👈 skip empty scans

    const scannedText = typeof data === 'object' ? data.text : data;
    const expectedQRData = 'INOUTQR_CHECKIN_CODE_2024Q4';
    const token = localStorage.getItem('employeeToken');

    console.log('Scanned QR Data:', scannedText);

    if (scannedText !== expectedQRData) {
      toast.error('Invalid QR Code');
      setShowScanner(false);
      return;
    }

    
    const endpoint = isCheckedIn ? 'https://inoutqr-backend.onrender.com/api/employee/checkout' : 'https://inoutqr-backend.onrender.com/api/employee/checkin';
    
    console.log("Sending check-in request to:", endpoint);
    console.log("Authorization token:", token);
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      console.log("Server response:", result);

        if (res.ok) {
          const now = new Date().toLocaleString();
          setIsCheckedIn(!isCheckedIn);
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
        const res = await fetch('https://inoutqr-backend.onrender.com/api/employee/status', {
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
        const result = await fetch('https://inoutqr-backend.onrender.com/api/employee/timesheet', {
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
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stone-900 to-slate-900">
    {/* Header */}
    <header className="bg-stone-800/80 backdrop-blur-sm border-b border-stone-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:scale-105 transition-transform duration-300">
              <img 
                src="/assets/logo.png" 
                alt="InOut QR logo" 
                className="h-12 w-12 rounded-full border-2 border-amber-400/50 shadow-lg" 
              />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Welcome, <span className="text-amber-400">{employeeName}</span>
              </h1>
              <p className="text-stone-400 text-sm">Employee Dashboard</p>
            </div>
          </div>
          
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-stone-700/50 hover:bg-stone-600/50 border border-stone-600/50 hover:border-amber-400/50 text-stone-300 hover:text-white rounded-lg transition-all duration-200 hover:scale-105"
            onClick={() => {
              localStorage.removeItem('employee');
              localStorage.removeItem('employeeToken');
              navigate('/');
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Attendance Section */}
      <section className="mb-8">
        <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-amber-400/30 transition-colors duration-300">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Attendance Tracking</h2>
              <p className="text-stone-400">Today: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          {checkInMessage && (
            <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/30 rounded-xl">
              <p className="text-amber-200 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {checkInMessage}
              </p>
            </div>
          )}
          
          <button 
            onClick={handleCheckInOut}
            className={`group relative w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              isCheckedIn 
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:shadow-red-500/20' 
                : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 hover:shadow-amber-500/20'
            }`}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              {isCheckedIn ? (
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              )}
            </svg>
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </button>
        </div>
      </section>

      {/* QR Scanner */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-800 border border-stone-700 rounded-2xl p-6 max-w-md w-full">
            <QRScanner onScan={handleScan} />
          </div>
        </div>
      )}

      {/* Timesheet Section */}
      <section className="mb-8">
        <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-amber-400/30 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45-1.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Monthly Timesheet</h2>
            </div>
            
            <button 
              onClick={() => downloadCSV(timesheet)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-600/30 hover:to-yellow-600/30 border border-amber-600/30 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Download CSV</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="bg-stone-900/50 rounded-xl border border-stone-600/50">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-stone-600/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Check-in</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Check-out</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/50">
                  {timesheet.length > 0 ? (
                    <>
                      {timesheet.map((entry, index) => {
                        const hours = calculateHours(entry.check_in, entry.check_out);
                        return (
                          <tr key={index} className="hover:bg-stone-800/30 transition-colors duration-150">
                            <td className="px-4 py-3 text-sm text-stone-300">{new Date(entry.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-sm text-stone-300">{entry.check_in || '-'}</td>
                            <td className="px-4 py-3 text-sm text-stone-300">{entry.check_out || '-'}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                entry.status === 'Present' ? 'bg-green-900/30 text-green-400 border border-green-700/30' :
                                entry.status === 'Absent' ? 'bg-red-900/30 text-red-400 border border-red-700/30' :
                                'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
                              }`}>
                                {entry.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-stone-300 font-medium">{hours}</td>
                          </tr>
                        );
                      })}
                      <tr className="bg-amber-900/10 border-t-2 border-amber-600/30">
                        <td colSpan="4" className="px-4 py-3 text-sm font-bold text-amber-400">Total Hours</td>
                        <td className="px-4 py-3 text-sm font-bold text-amber-400">
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
                      <td colSpan="5" className="px-4 py-8 text-center text-stone-400">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-stone-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                          </svg>
                          No records for this month
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="mb-8">
        <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-amber-400/30 transition-colors duration-300">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-amber-900/10 border border-amber-700/20 rounded-lg hover:bg-amber-900/20 transition-colors duration-200">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-stone-300">New Company Policy Update</p>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-amber-900/10 border border-amber-700/20 rounded-lg hover:bg-amber-900/20 transition-colors duration-200">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-stone-300">Upcoming Event: Team Building Day</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-stone-900/80 backdrop-blur-sm border-t border-stone-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-stone-400">
            <Link 
              to="/support" 
              className="hover:text-amber-400 transition-colors duration-200 text-sm"
            >
              Help & Support
            </Link>
            <span className="text-stone-600">|</span>
            <Link 
              to="/terms" 
              className="hover:text-amber-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
          </Link>
            <span className="text-stone-600">|</span>
            <Link 
              to="/privacy" 
              className="hover:text-amber-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
          </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
  // return (
  //   <div className="employee-dashboard">
  //     <header className="dashboard-header">
  //        <div className="header-inner">
  //         <Link to="/">
  //           <img src="/assets/logo.png" alt="InOut QR logo" className="logo" />
  //         </Link>
  //         <h1 className="welcome-msg">Welcome {employeeName}</h1>
  //         <button
  //           className="logout-btn"
  //           onClick={() => {
  //             localStorage.removeItem('employee');
  //             localStorage.removeItem('employeeToken');
  //             navigate('/');
  //           }}
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </header>

  //     <section className="attendance-section">
  //       <h2>Attendance Tracking</h2>
  //       <p>Date: {new Date().toLocaleDateString()}</p>
  //       <p>{checkInMessage}</p>
  //       <button onClick={handleCheckInOut}>
  //         {isCheckedIn ? 'Check Out' : 'Check In'}
  //       </button>
        
  //     </section>

  //     {showScanner && <QRScanner onScan={handleScan} />}

  //     <section className="timesheet-section">
  //       <h2>Monthly Timesheet</h2>
  //       {/* Calendar grid or table would go here */}
  //       <div className="attendance-table-wrapper">
  //         <table className="attendance-table">
  //           <thead>
  //             <tr>
  //               <th>Date</th>
  //               <th>Check-in</th>
  //               <th>Check-out</th>
  //               <th>Status</th>
  //               <th>Hours Worked</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {timesheet.length > 0 ? (
  //               <>
  //               {timesheet.map((entry, index) => {
  //                 const hours = calculateHours(entry.check_in, entry.check_out);
  //                 return (
  //                 <tr key={index}>
  //                   <td>{new Date(entry.date).toLocaleDateString()}</td>
  //                   <td>{entry.check_in || '_'}</td>
  //                   <td>{entry.check_out || '_'}</td>
  //                   <td>{entry.status}</td>
  //                   <td>{hours}</td>
  //                 </tr>
  //               );
  //             })}
  //             <tr style={{fontWeight: 'bold'}}>
  //                 <td colSpan="4">Total Hours</td>
  //                 <td>
  //                   {timesheet
  //                     .reduce((sum, entry) => {
  //                       return sum + parseFloat(calculateHours(entry.check_in, entry.check_out));
  //                     }, 0)
  //                     .toFixed(2)
  //                   }
  //                 </td>
  //               </tr>
  //               </>
  //             ) : (
  //               <tr>
  //                 <td colSpan="5">No Records for this month.</td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //       <button onClick={() => downloadCSV(timesheet)}>Download Timesheet</button>
  //     </section>

  //     <section className="notifications-section">
  //       <h2>Notifications</h2>
  //       <ul>
  //         <li>New Company Policy Update</li>
  //         <li>Upcoming Event: Team Building Day</li>
  //       </ul>
  //     </section>

  //     <footer className="dashboard-footer"> 
  //       <a href="/support">Help</a> | 
  //       <a href="/terms">Terms of Service</a> | 
  //       <a href="/privacy">Privacy Policy</a>
  //     </footer>
  //   </div>
  // );
}

export default EmployeeDashboard;
