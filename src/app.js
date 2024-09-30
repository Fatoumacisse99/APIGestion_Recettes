/* eslint-disable */
import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dotenv from 'dotenv';
import db from './config/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', recipeRoutes);
app.use('/categories', categoryRoutes);

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};
app.use(cors(corsOptions));
app.get('/api/get-recettes', async (_req, res) => {
  try {
    // Tester la connexion à la base de données
    await db.query('SELECT 1');

    const [recettes] = await db.query('SELECT * FROM recipes');
    res.json({
      message: 'Connexion réussie à la base de données MySQL !',
      recettes, // Retourner les recettes
    });
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    res.status(500).json({
      message: 'Échec de la connexion à la base de données.',
      error: err.message,
    });
  }
});
app.get('/api/test', (_req, res) => {
  res.json({ message: 'Connexion réussie avec le back-end' });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
