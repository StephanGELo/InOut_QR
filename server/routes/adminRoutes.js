import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const router = express.Router();
const saltRounds = 15;

// Testing route
router.get('/test', (req, res) =>{
  res.send("Admin API is working");
});

// Get all admins
router.get('/employees', async(req, res) => {
  try {
    const query = "SELECT id, name, email FROM users WHERE role ='employee' ORDER BY id ASC";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch(err) {
    res.status(500).json({error: 'Failed to fetch employees'});
  };
});

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

    res.status(200).json({ message: 'Login Succesful', admin: { id: admin.id, email: admin.email }});

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
      return res.status(400).hjson({ error: "User already exists."});
    } 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Insert new user into the database
    const insertUserQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, email';
    const insertUserResult = await pool.query(insertUserQuery, [name, email, hashedPassword, 'employee']);
    res.status(201).json(insertUserResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create employee"})
  };
});


export default router;