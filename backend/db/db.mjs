// db/db.mjs
import pkg from 'pg';
const { Pool } = pkg;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'coldstone',
  host: 'localhost',
  database: 'task_manager',
  password: '1234',
  port: 5432,
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database');
    release(); // Release the client back to the pool
  }
});

export default pool;
