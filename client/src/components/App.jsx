import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './Homepage';
import EmployeeLogin from './EmployeeLogin';
import AdminLogin from './AdminLogin';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
