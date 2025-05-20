import React from 'react';
import { Route, Routes , Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './Homepage';
import EmployeeLogin from './EmployeeLogin';
import AdminLogin from './AdminLogin';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';


function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [employeeLoggedIn, setEmployeeLoggedIn] = useState(false);

  useEffect(() => {
    setAdminLoggedIn(!!localStorage.getItem('adminToken'));
    setEmployeeLoggedIn(!!localStorage.getItem('employeeToken'));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/employee-dashboard" 
          element={
            employeeLoggedIn ? (
              <EmployeeDashboard />
            ) : (
              <Navigate to="/employee-login" replace />
            )
          }
        />
        <Route 
          path="/admin-dashboard" 
          element={
            adminLoggedIn ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin-login"  replace />
            )
          }
        />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
