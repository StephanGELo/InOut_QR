// employeeController.js
import pool from '../config/db.js';

// CHECKIN
export const checkIn = async (req, res) => {
    // console.log('Decoded user from token:', req.user);
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

//CHECKOUT
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

// GET TODAY STATUS
export const getTodayStatus = async (req, res) =>{
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    const query = `SELECT check_in, check_out FROM attendance WHERE user_id= $1 AND date = $2`;
    const result = await pool.query(query, [userId, today]);

    if (result.rows.length === 0 ) {
      return res.status(200).json({checkedIn: false});
    }
    
    const { check_in, check_out } = result.rows[0];

    res.status(200).json({
      checkedIn: !!check_in && !check_out,
      message: check_out
      ? 'Already checked out'
      : 'Checked in but not yet checked out',
    });
  } catch (err) {
    console.error('Status fetch error', err);
    res.status(500).json({ error: 'Failed to fetch status'});
  };
};

// GET EMPLOYEE's TIMESHEET
export const getTimesheet = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const query = `
      SELECT date, check_in, check_out,
        CASE
          WHEN check_in IS NOT NULL AND check_out IS NOT NULL THEN 'Present'
          WHEN check_in IS NOT NULL AND check_out IS NULL THEN 'Checked_in only'
          ELSE 'Absent'
        END AS status
        FROM attendance
        WHERE user_id = $1 AND date BETWEEN $2 AND $3
        ORDER BY date ASC
    `;
    const result = await pool.query(query, [userId, firstDay, lastDay]);

    res.status(200).json(result.rows);
  } catch(err) {
    console.error("Failed to fetch Timesheet", err);
    res.status(500).json({ error: 'Failed to load timesheet'});
  };
};
