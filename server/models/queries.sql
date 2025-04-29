-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  role VARCHAR(20) CHECK (role IN ('employee', 'admin')) NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create atendance table
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, date)
);
