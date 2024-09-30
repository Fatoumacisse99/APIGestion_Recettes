// // /* eslint-disable */
// import express from 'express';
// import recipeRoutes from './routes/recipeRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();
// app.use('/api', recipeRoutes);

// router.get('/get-recettes', async (_req, res) => {
//   try {
//     // Tester la connexion à la base de données
//     await db.query('SELECT 1');

//     const [recettes] = await db.query('SELECT * FROM recipes');
//     res.json({
//       message: 'Connexion réussie à la base de données MySQL !',
//       recettes, // Retourner les recettes
//     });
//   } catch (err) {
//     console.error('Erreur de connexion à la base de données :', err);
//     res.status(500).json({
//       message: 'Échec de la connexion à la base de données.',
//       error: err.message,
//     });
//   }
// });

// export default router;

// const PORT = process.env.APP_PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

/* eslint-disable */
import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dotenv from 'dotenv';
import db from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// Utiliser le préfixe /api pour toutes les routes de recettes
app.use('/api', recipeRoutes);
app.use('/categories', categoryRoutes);

// Route pour obtenir toutes les recettes
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

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
