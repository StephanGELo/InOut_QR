//employeeRoutes.js
import express from 'express';
import { verifyEmployeeToken } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';


import {
  checkIn,
  checkOut,
  getTimesheet,
  getTodayStatus
} from '../controllers/employeeController.js';

const router = express.Router();

// Example protected employee route
router.get('/dashboard', verifyEmployeeToken, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.name}`,
    user: req.user
  });
});

// POST /api/employee/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
     console.log('Login attempt payload:', req.body);
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND role = $2',
      [email, 'employee']
    );

    const employee = result.rows[0];

    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: employee.id,
        name: employee.name,
        role: 'employee'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      employee: { id: employee.id, name: employee.name, email: employee.email }
    });

  } catch (err) {
    console.error('Employee login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.post('/checkin', verifyEmployeeToken, checkIn);
router.post('/checkout', verifyEmployeeToken, checkOut);
router.get('/status', verifyEmployeeToken, getTodayStatus);
router.get('/timesheet', verifyEmployeeToken, getTimesheet);


export default router;
