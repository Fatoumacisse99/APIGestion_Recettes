// recipeController.js
import RecipeModel from '../models/Recipe.js';
import CategoryModel from '../models/categoryModel.js';

const createRecipe = async (req, res) => {
  try {
    // Vérification de l'existence de la recette avec le même titre
    const existingRecipe = await RecipeModel.getRecipeByTitle(req.body.titre);
    if (existingRecipe) {
      return res
        .status(400)
        .json({ message: 'Une recette avec ce titre existe déjà.' });
    }

    // Vérification de l'existence de la catégorie
    const categoryExists = await CategoryModel.getCategoryById(req.body.category_id);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: 'La catégorie spécifiée n\'existe pas.' });
    }
    

    // Création de la nouvelle recette
    const newRecipe = await RecipeModel.createRecipe(req.body);
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Erreur lors de la création de la recette: ' + err.message,
      });
  }
};
const getRecipeByTitle = async (req, res) => {
  const { titre } = req.params; // Récupérer le titre de la requête
  try {
    const recipe = await RecipeModel.getRecipeByTitle(titre);
    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération de la recette par titre: ' + err.message,
    });
  }};


// Obtenir toutes les recettes
const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération des recettes: ' + err.message,
      });
  }
};

// Obtenir une recette par ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération de la recette: ' + err.message,
      });
  }
};
const getRecipesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const recipes = await RecipeModel.getRecipesByCategory(categoryId);
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des recettes par catégorie: ' + err.message,
    });
  }
};

// Mettre à jour une recette
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    const updatedRecipe = await RecipeModel.updateRecipe(id, req.body);
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Erreur lors de la mise à jour de la recette: ' + err.message,
      });
  }
};

// Supprimer une recette
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    await RecipeModel.deleteRecipe(id);
    return res.status(204).send(); // No content
  } catch (err) {
    return res
      .status(500)
      .json({
        message: 'Erreur lors de la suppression de la recette: ' + err.message,
      });
  }
  
};
export default {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeByTitle,
  getRecipesByCategory,
};
