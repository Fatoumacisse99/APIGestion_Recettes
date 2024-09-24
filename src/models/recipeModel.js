// models/recipeModul.js
// const db = require('../config/db');

// // Get all recipes
// const getAllRecipes = async () => {
//   db.query('SELECT * FROM recipes', (err, results) => {
//     if (err) return callback(err, null);
//     callback(null, results);
//   });
// };

// // Get recipe by ID
// const getRecipeById = (id, callback) => {
//   db.query('SELECT * FROM recipes WHERE id = ?', [id], (err, result) => {
//     if (err) return callback(err, null);
//     if (result.length === 0) return callback(new Error('Recipe not found'), null);
//     callback(null, result[0]);
//   });
// };

// // Create a new recipe
// const createRecipe = (recette, callback) => {
//   const { name, instructions, user_id } = recette;
//   db.query('INSERT INTO recipes (name, instructions, user_id) VALUES (?, ?, ?)', [name, instructions, user_id], (err, result) => {
//     if (err) return callback(err, null);
//     callback(null, { id: result.insertId, ...recette });
//   });
// };

// // Update a recipe
// const updateRecipe = (id, recette, callback) => {
//   const { name, instructions, user_id } = recette;
//   db.query('UPDATE recipes SET name = ?, instructions = ?, user_id = ? WHERE id = ?', [name, instructions, user_id, id], (err, result) => {
//     if (err) return callback(err, null);
//     if (result.affectedRows === 0) return callback(new Error('Recipe not found'), null);
//     callback(null, { id, ...recette });
//   });
// };

// // Delete a recipe
// const deleteRecipe = (id, callback) => {
//   db.query('DELETE FROM recipes WHERE id = ?', [id], (err, result) => {
//     if (err) return callback(err, null);
//     if (result.affectedRows === 0) return callback(new Error('Recipe not found'), null);
//     callback(null);
//   });
// };

// module.exports = {
//   getAllRecipes,
//   getRecipeById,
//   createRecipe,
//   updateRecipe,
//   deleteRecipe
// };
const db = require('../config/db'); // Assurez-vous que le chemin est correct

// Obtenir une recette par titre
const getRecipeByTitle = async (titre) => {
  const query = 'SELECT * FROM recipes WHERE titre = ?';
  const [rows] = await db.query(query, [titre]);
  return rows.length > 0 ? rows[0] : null; // Retourne la recette ou null si elle n'existe pas
};

// Créer une nouvelle recette
const createRecipe = async (recipeData) => {
  const { titre, ingredients, type } = recipeData;
  const query = 'INSERT INTO recipes (titre, ingredients, type) VALUES (?, ?, ?)';
  const [result] = await db.query(query, [titre, ingredients, type]);
  return { id: result.insertId, titre, ingredients, type };
};

// Obtenir toutes les recettes
const getAllRecipes = async () => {
  const query = 'SELECT * FROM recipes';
  const [rows] = await db.query(query);
  return rows;
};

// Obtenir une recette par ID
const getRecipeById = async (id) => {
  const query = 'SELECT * FROM recipes WHERE id = ?';
  const [rows] = await db.query(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

// Mettre à jour une recette
const updateRecipe = async (id, recipeData) => {
  const { titre, ingredients, type } = recipeData;
  const query = 'UPDATE recipes SET titre = ?, ingredients = ?, type = ? WHERE id = ?';
  await db.query(query, [titre, ingredients, type, id]);
  return { id, titre, ingredients, type };
};

// Supprimer une recette
// const deleteRecipe = async (id) => {
//   const query = 'DELETE FROM recipes WHERE id = ?';
//   await db.query(query, [id]);
// };
const deleteRecipe = async (req, res) => {
  try {
    const result = await RecipeModel.deleteRecipe(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }
    return res.status(204).send(); // No Content
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getRecipeByTitle,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
