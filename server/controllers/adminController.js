import pool from '../config/db.js';
import bcrypt from 'bcrypt';


// Get all employees
export const getEmployees = async (req, res) =>{
  try {
    const query = "SELECT id, name, email FROM users WHERE role ='employee' ORDER BY id ASC";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Get all attendance logs with employee details
export const getAttendanceLogs = async (req, res) => {
    try {
    const query = `
      SELECT
        a.id,
        u.name,
        u.email,
        a.date,
        a.check_in,
        a.check_out,
        CASE
          WHEN a.check_in IS NOT NULL AND a.check_out IS NOT NULL THEN 'Present'
          WHEN a.check_in IS NOT NULL AND a.check_out IS NULL THEN 'Checked-in only'
          ELSE 'Absent'
        END AS status
      FROM attendance a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.date DESC, u.name ASC
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance logs' });
  }
};

// Attendance Summary for Today
export const getSummary = async (req, res) => {
try {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

  // Get total employees
  const totalEmpResult = await pool.query(`SELECT COUNT(*) FROM users  WHERE role = 'employee'`);
  const totalEmployees = parseInt(totalEmpResult.rows[0].count);

  // Get number of employees who checked in today
  const presentResult = await pool.query(`
    SELECT COUNT(DISTINCT user_id)
    FROM attendance
    WHERE date = $1 AND check_in IS NOT NULL`, [today]);
    const present = parseInt(presentResult.rows[0].count);

    const absentees = totalEmployees - present;
    const attendanceRate = totalEmployees > 0 
    ? Math.round((present / totalEmployees) * 100) 
    : 0;
    res.status(200).json({
      totalEmployees,
      present,
      absentees,
      attendanceRate
    });

} catch (err) {
  console.error('Failed to fetch summary');
  res.status(500).json({error: 'Failed to fetch summary'});
};
};