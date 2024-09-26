// recipeController.js
import RecipeModel from '../models/Recipe.js';

export const createRecipe = async (req, res, ) => {
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
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la récupération des recettes: " + err.message });
  }
};

// Obtenir une recette par ID
export const getRecipeById = async (req, res) => {
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
export const updateRecipe = async (req, res) => {
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
export const deleteRecipe = async (req, res) => {
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
export default {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};