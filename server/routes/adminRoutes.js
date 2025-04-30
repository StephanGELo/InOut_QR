import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const router = express.Router();

// Testing route
router.get('/test', (req, res) =>{
  res.send("Admin API is working");
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
export default router;