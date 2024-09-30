/* eslint-disable */
import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  port: process.env.DB_PORT,
});
// Connexion test
const testConnection = async () => {
  try {
    await db.query('SELECT 1');
    console.log('Connecté à la base de données MySQL !');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
  }
};

 testConnection();

export default db;
