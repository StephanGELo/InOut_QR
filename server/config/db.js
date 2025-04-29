import pkg from 'pg';
import env from 'dotenv';

env.config();

const { Pool } = pkg;

// Connection pool to database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false} : false, // it enable SSL and disable certificate verification in production
});


export default pool;