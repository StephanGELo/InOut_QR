// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeList from './EmployeeList';
// import '../styles/AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [attendanceLogs, setAttendanceLogs] = useState([]); // Sample state for logs
  const [ summary, setSummary ] = useState({
    totalEmployees: 0,
    present: 0,
    absentees: 0,
    attendanceRate: 0
  });

  const storedAdmin = JSON.parse(localStorage.getItem('admin'));
  const adminName = storedAdmin?.name || 'Admin';
  const token = localStorage.getItem('adminToken');

  const attendanceData = [
    { name: 'Present', value: summary.present },
    {name: 'Absent', value: summary.absentees }
  ];

  const COLORS = ['#28a745', '#dc3545'];
  
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const fetchAttendanceLogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/attendance`, {
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      const data = await res.json();
      setAttendanceLogs(data);
    } catch(err) {
      toast.error("Error Fetching attendance logs");
    };
  };

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/summary`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setSummary(data);
    } catch(err) {
      toast.error("Error Fetching Summary");
    };
  };

  useEffect(() => {
  //  console.log("AdminDashboard mounted");
    fetchAttendanceLogs();
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-stone-900 to-slate-900">
      {/* Header */}
      <header className="bg-stone-800/80 backdrop-blur-sm border-b border-stone-700/50 sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <a href="/" className="hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="/assets/logo.png" 
                  alt="InOut QR logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-yellow-500/60 shadow-lg object-cover" 
                />
              </a>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
                    Welcome, <span className="text-yellow-400">{adminName}</span>
                  </h1>
                  <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-600/30 rounded-full mt-1 sm:mt-0 self-start">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-yellow-400 text-xs font-medium">Admin</span>
                  </div>
                </div>
                <p className="text-stone-400 text-xs sm:text-sm">Administrator Dashboard</p>
              </div>
            </div>
            
            <button
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-yellow-700/30 to-amber-700/30 hover:from-yellow-600/40 hover:to-amber-600/40 border border-yellow-600/40 hover:border-yellow-500/60 text-yellow-300 hover:text-yellow-200 rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0"
              onClick={() => {
                localStorage.removeItem('admin');
                localStorage.removeItem('adminToken');
                navigate('/');
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard Overview Section */}
        <section className="mb-8">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-yellow-400/30 transition-colors duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-xl p-6 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-blue-300 text-sm font-medium uppercase tracking-wide">Total Employees</h3>
                    <p className="text-3xl font-bold text-white mt-2">{summary.totalEmployees}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-600/30 rounded-xl p-6 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green-300 text-sm font-medium uppercase tracking-wide">Attendance Rate</h3>
                    <p className="text-3xl font-bold text-white mt-2">{summary.attendanceRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-600/30 rounded-xl p-6 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-red-300 text-sm font-medium uppercase tracking-wide">Absentees</h3>
                    <p className="text-3xl font-bold text-white mt-2">{summary.absentees}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-600/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attendance Chart Section */}
        <section className="mb-8">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-400/30 transition-colors duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Attendance Breakdown</h2>
            </div>
            
            <div className="bg-stone-900/50 rounded-xl p-4 sm:p-6 border border-stone-600/30">
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign='bottom' height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Attendance Logs Section */}
        <section className="mb-8">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-400/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Attendance Logs</h2>
              </div>
              
              <button 
                onClick={fetchAttendanceLogs}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 hover:from-yellow-600/30 hover:to-amber-600/30 border border-yellow-600/30 hover:border-yellow-500/50 text-yellow-400 hover:text-yellow-300 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="bg-stone-900/50 rounded-xl border border-stone-600/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-stone-600/50">
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">ID</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Name</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider hidden sm:table-cell">Email</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Date</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider hidden md:table-cell">Check-in</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider hidden md:table-cell">Check-out</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-700/50">
                        {attendanceLogs.length ? (
                          attendanceLogs.map((log, index) => (
                            <tr key={index} className="hover:bg-stone-800/30 transition-colors duration-150">
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-300 font-medium">{log.id}</td>
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-300">
                                <div>
                                  <div className="font-medium">{log.name}</div>
                                  <div className="text-xs text-stone-400 sm:hidden">{log.email}</div>
                                </div>
                              </td>
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-400 hidden sm:table-cell">{log.email}</td>
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-300">{new Date(log.date).toLocaleDateString()}</td>
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-300 hidden md:table-cell">{log.check_in || '-'}</td>
                              <td className="px-3 sm:px-4 py-3 text-sm text-stone-300 hidden md:table-cell">{log.check_out || '-'}</td>
                              <td className="px-3 sm:px-4 py-3 text-sm">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  log.status === 'Present' ? 'bg-green-900/30 text-green-400 border border-green-700/30' :
                                  log.status === 'Absent' ? 'bg-red-900/30 text-red-400 border border-red-700/30' :
                                  'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
                                }`}>
                                  {log.status}
                                </span>
                                <div className="md:hidden mt-1 text-xs text-stone-400">
                                  {log.check_in && <div>In: {log.check_in}</div>}
                                  {log.check_out && <div>Out: {log.check_out}</div>}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="px-3 sm:px-4 py-8 text-center text-stone-400">
                              <div className="flex flex-col items-center">
                                <svg className="w-12 h-12 text-stone-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                </svg>
                                No attendance logs available
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Employee Management Section */}
        <section className="mb-8">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-400/30 transition-colors duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Manage Employees</h2>
            </div>
            
            <div className="bg-stone-900/30 rounded-xl p-3 sm:p-4 border border-stone-600/30">
              <EmployeeList />
            </div>
          </div>
        </section>

        {/* QR Code Management Section */}
        <section className="mb-8">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700/50 rounded-2xl p-6 sm:p-8 hover:border-yellow-400/30 transition-colors duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">QR Code Management</h2>
            </div>
            
            <div className="bg-stone-900/30 rounded-xl p-4 sm:p-6 border border-stone-600/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="min-w-0 flex-1">
                  <p className="text-stone-300 mb-2">Current QR Code:</p>
                  <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-yellow-300 font-mono text-xs sm:text-sm break-all">INOUTQR_CHECKIN_CODE_2024Q4</span>
                  </div>
                </div>
                
                <button className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 w-full sm:w-auto">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">Generate New QR Code</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
