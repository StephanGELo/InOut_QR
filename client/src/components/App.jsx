import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './Homepage';
import EmployeeLogin from './EmployeeLogin';
import AdminLogin from './AdminLogin';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
