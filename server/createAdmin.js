import env from 'dotenv';
import bcrypt from 'bcrypt';
import pool from './config/db.js';

env.config();

// Function to create an admin user
const createAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const saltRounds = 10;
  // check if admin credentials are provided
  if (!name || !username || !password) {
    console.error('❌ Error: ADMIN_NAME, ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
    process.exit(1); // Stop the process and notify it's an error
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    // Check if the admin user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserResult = await pool.query(checkUserQuery, [username]);
    if (checkUserResult.rows.length > 0) {
      console.log('✅ Admin user already exists. No action taken.');
      return;
    }
    // Insert the new admin user into the database
    const insertUserQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertUserResult = await pool.query(insertUserQuery, [name, username, hashedPassword, 'admin']);
    console.log('✅ Admin user created successfully:', insertUserResult.rows[0]);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
  } finally {
    process.exit(0); // Terminate the process after the operation
  };
};

createAdmin();