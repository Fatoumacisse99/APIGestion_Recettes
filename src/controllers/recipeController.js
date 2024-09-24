// // recipeController.js
// const recetteModul = require('../models/recipeModul');
// // Get all recipes
// exports.getAllRecipes = (_req, res, _next) => {
//   recetteModul.getAllRecipes((err, recipes) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(200).json(recipes);
//   });
// };
// // Get recipe by ID
// exports.getRecipeById = (req, res, _next) => {
//   const { id } = req.params;
//   recetteModul.getRecipeById(id, (err, recipe) => {
//     if (err) return res.status(404).send(err.message);
//     res.status(200).json(recipe);
//   });
// };
// // Create a new recipe
// exports.createRecipe = (req, res, _next) => {
//   const recette = req.body;
//   recetteModul.createRecipe(recette, (err, newRecipe) => {
//     if (err) return res.status(500).send(err.message);
//     res.status(201).json(newRecipe);
//   });
// };
// // Update a recipe
// exports.updateRecipe = (req, res, _next) => {
//   const { id } = req.params;
//   const recette = req.body;
//   recetteModul.updateRecipe(id, recette, (err, updatedRecipe) => {
//     if (err) return res.status(404).send(err.message);
//     res.status(200).json(updatedRecipe);
//   });
// };

// // Delete a recipe
// exports.deleteRecipe = (req, res, _next) => {
//   const { id } = req.params;
//   recetteModul.deleteRecipe(id, (err) => {
//     if (err) return res.status(404).send(err.message);
//     res.status(204).send();
//   });
// };
const RecipeModel = require('../models/recipeModel');

// Créer une nouvelle recette
const createRecipe = async (req, res) => {
  try {
    const existingRecipe = await RecipeModel.getRecipeByTitle(req.body.titre);
    if (existingRecipe) {
      return res.status(400).json({ message: "Une recette avec ce titre existe déjà." });
    }

    const newRecipe = await RecipeModel.createRecipe(req.body);
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la création de la recette: " + err.message });
  }
};

// Obtenir toutes les recettes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la récupération des recettes: " + err.message });
  }
};

// Obtenir une recette par ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la récupération de la recette: " + err.message });
  }
};

// Mettre à jour une recette
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }

    const updatedRecipe = await RecipeModel.updateRecipe(id, req.body);
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la mise à jour de la recette: " + err.message });
  }
};

// Supprimer une recette
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }

    await RecipeModel.deleteRecipe(id);
    return res.status(204).send(); // No content
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la suppression de la recette: " + err.message });
  }
};

// Exportation des fonctions du contrôleur
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
