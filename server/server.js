// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';
import pool from './config/db.js';


// Import routes 

// Initialize express app
const app = express();

// Load environment variables
env.config();

// Middleware
app.use(cors()); // <-- Allow frontend to connect to backend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //  for POST requests
app.use(express.static('public'));

// check route status
app.get('/api/check', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running properly' });
});

// Test database connection
// This is a test route to check if the database connection is working
// and to get the current server time
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('select NOW()');
    res.send(`DB Connected. Server time: ${result.rows[0].now}`);
  } catch(err) {
    console.error('DB Connection Error:', err);
    res.status(500).send('DB Connection Error');
  };
});

// Use routes (to be added later)

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
