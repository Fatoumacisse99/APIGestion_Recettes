/* eslint-disable */
import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express(); 
app.use('/api', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
