const recetteModul = require('../models/recipeModul');

// Get all recipes
exports.getAllRecipes = (req, res) => {
  recetteModul.getAllRecipes((err, recipes) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).json(recipes);
  });
};

// Get recipe by ID
exports.getRecipeById = (req, res) => {
  const { id } = req.params;
  recetteModul.getRecipeById(id, (err, recipe) => {
    if (err) return res.status(404).send(err.message);
    res.status(200).json(recipe);
  });
};

// Create a new recipe
exports.createRecipe = (req, res) => {
  const recette = req.body;
  recetteModul.createRecipe(recette, (err, newRecipe) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).json(newRecipe);
  });
};

// Update a recipe
exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const recette = req.body;
  recetteModul.updateRecipe(id, recette, (err, updatedRecipe) => {
    if (err) return res.status(404).send(err.message);
    res.status(200).json(updatedRecipe);
  });
};

// Delete a recipe
exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  recetteModul.deleteRecipe(id, (err) => {
    if (err) return res.status(404).send(err.message);
    res.status(204).send();
  });
};
