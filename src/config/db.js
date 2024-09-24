/* eslint-disable */
import mysql from 'mysql2/promise'; // Ensure 'mysql2/promise' is used
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  port: 3306, // Use the appropriate port for your DB
});

export default db;
