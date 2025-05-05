import React from 'react';
import { Route, Routes , Navigate } from 'react-router-dom';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './Homepage';
import EmployeeLogin from './EmployeeLogin';
import AdminLogin from './AdminLogin';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import { use } from 'react';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/employee-dashboard" 
          element={
            localStorage.getItem('employeeToken') ? (
              <EmployeeDashboard />
            ) : (
              <Navigate to="/employee-login" replace />
            )
          }
        />
        <Route 
          path="/admin-dashboard" 
          element={
            localStorage.getItem('adminToken') ? (
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
