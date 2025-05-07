// employeeController.js
import pool from '../config/db.js';

export const checkIn = async (req, res) => {
    console.log('Decoded user from token:', req.user);
  try {
    const userId = req.user.id; // assuming employeeToken has been decoded by middleware
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0]; // 'HH:MM:SS'

    // Check if there's already an entry for today
    const checkQuery = 'SELECT * FROM attendance WHERE user_id = $1 AND date = $2';
    const checkResult = await pool.query(checkQuery, [userId, today]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Already checked in today' });
    }

    // Insert new check-in record
    const insertQuery = `
      INSERT INTO attendance (user_id, date, check_in)
      VALUES ($1, $2, $3)
      RETURNING id, check_in
    `;
    const insertResult = await pool.query(insertQuery, [userId, today, now]);

    res.status(201).json({
      message: 'Check-in successful',
      attendance: insertResult.rows[0],
    });
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).json({ error: 'Failed to check in' });
  }
};

export const checkOut = async (req, res) => {
  
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().split(' ')[0];  // HH:MM:SS

    // Check is user has checked in today
    const checkQuery = 'SELECT * FROM attendance WHERE user_id = $1 and date = $2';
    const checkResult = await pool.query(checkQuery, [userId, today]);

    if(checkResult.rows.length === 0) {
      return res.status(400).json({error: 'No check-in record found for today'});
    }

    const attendance = checkResult.rows[0];
    if (attendance.checkOut) {
      res.status(400).json({ error: 'Already checked out today'});
    };

    // Update record with checkout time
    const updateQuery = 
    `UPDATE attendance
      SET check_out = $1
      WHERE id = $2
      RETURNING id, check_in, check_out
    `
    const updateResult = await pool.query(updateQuery, [now, attendance.id]);

    res.json({
      message:'check-out succesful',
      attendance : updateResult.rows[0]
    });

  } catch(err) {
    console.error('Check-out error', err);
    res.status(500).json({ error: 'Failed to check out'});
  };
};