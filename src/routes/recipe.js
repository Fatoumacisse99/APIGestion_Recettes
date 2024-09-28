import express from "express";
import recipeController from "../controllers/Recipe.js"; // Import correct sans parenthèses

// Importer les validateurs
import {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
  validate,
} from "../validators/Validator.js"; // Pas de parenthèses autour des chemins

// Définir le routeur
const router = express.Router(); // Création d'une instance du routeur

// Définir les routes CRUD avec validation
router.get("/recipes", recipeController.getAllRecipes);
router.get(
  "/recipes/:id",
  validateUpdateRecipe(),
  validate,
  recipeController.getRecipeById,
);
router.post(
  "/recipes",
  validateCreateRecipe(),
  validate,
  recipeController.createRecipe,
);
router.put(
  "/recipes/:id",
  validateUpdateRecipe(),
  validate,
  recipeController.updateRecipe,
);
router.delete(
  "/recipes/:id",
  validateDeleteRecipe(),
  validate,
  recipeController.deleteRecipe,
);

export default router;
