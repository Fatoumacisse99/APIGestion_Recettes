const db = require('../config/db');

// Get all recipes
const getAllRecipes = (callback) => {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Get recipe by ID
const getRecipeById = (id, callback) => {
  db.query('SELECT * FROM recipes WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err, null);
    if (result.length === 0) return callback(new Error('Recipe not found'), null);
    callback(null, result[0]);
  });
};

// Create a new recipe
const createRecipe = (recette, callback) => {
  const { name, instructions, user_id } = recette;
  db.query('INSERT INTO recipes (name, instructions, user_id) VALUES (?, ?, ?)', [name, instructions, user_id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id: result.insertId, ...recette });
  });
};

// Update a recipe
const updateRecipe = (id, recette, callback) => {
  const { name, instructions, user_id } = recette;
  db.query('UPDATE recipes SET name = ?, instructions = ?, user_id = ? WHERE id = ?', [name, instructions, user_id, id], (err, result) => {
    if (err) return callback(err, null);
    if (result.affectedRows === 0) return callback(new Error('Recipe not found'), null);
    callback(null, { id, ...recette });
  });
};

// Delete a recipe
const deleteRecipe = (id, callback) => {
  db.query('DELETE FROM recipes WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err, null);
    if (result.affectedRows === 0) return callback(new Error('Recipe not found'), null);
    callback(null);
  });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
