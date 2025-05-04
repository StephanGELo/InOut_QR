// adminRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

import {
  getEmployees,
  getAttendanceLogs,
  getSummary
} from '../controllers/adminController.js';

import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const saltRounds = 15;

// Testing route
router.get('/test', (req, res) =>{
  res.send("Admin API is working");
});

/////***GET REQUESTS***//////

router.get('/employees', getEmployees);
router.get('/attendance', verifyAdminToken, getAttendanceLogs);
router.get('/summary', verifyAdminToken, getSummary);

//////***POST REQUESTS***//////
// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userQuery = 'SELECT * from users WHERE email = $1 AND role = $2';
    const userQueryResult = await pool.query(userQuery, [email, 'admin']);
    const admin = userQueryResult.rows[0];
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    };

    const token =JsonWebTokenError.sign(
      {
        id: admin.id,
        role: 'admin',
        name: admin.name
      }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
   
    res.status(200).json({ 
      message: 'Login Succesful', 
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email }
    });

  } catch (err) { 
    res.status(500).json({ error: ' Server error'});
  };
});

// Add new employee
router.post('/employees', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are requred"});
  }

  try {
    // check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserResult = await pool.query(checkUserQuery, [email]);
    if (checkUserResult.rows.length > 0) {
      return res.status(400).json({ error: "User already exists."});
    } 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert new user into the database
    const insertUserQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email';
    const insertUserResult = await pool.query(insertUserQuery, [name, email, hashedPassword, 'employee']);
    res.status(201).json(insertUserResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee"})
  };
});

//////***DELETE***//////
router.delete('/employees/:id', async( req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = 'DELETE FROM users WHERE id = $1 AND role =  $2';
    const deleteResult = await pool.query(deleteQuery, [ id, 'employee' ] );
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: 'Employee not fount or not an employee'});
    }
    res.status(200).json({ message: 'Employee deleted Sucessfully'});
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete employee'});
  };
});

//////***PUT***//////
// Update employee
router.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, role, password } = req.body;

  try {
    const updates = [];
    const values = [];
    let index = 1;

    if (name) {
      updates.push(`name = $${index++}`);
      values.push(name);
    }
    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email);
    }
    if (phone) {
      updates.push(`phone = $${index++}`);
      values.push(phone);
    }
    if (address) {
      updates.push(`address = $${index++}`);
      values.push(address);
    }
    if (role) {
      updates.push(`role = $${index++}`);
      values.push(role);
    }
    if (password) {
      const bcrypt = await import('bcrypt');
      const hashed = await bcrypt.hash(password, 10);
      updates.push(`password = $${index++}`);
      values.push(hashed);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${index} RETURNING id, name, email`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated', employee: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

export default router;