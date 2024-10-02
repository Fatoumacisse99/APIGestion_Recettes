import express from "express";
import recipeController from "../controllers/Recipe.js"; 

import {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
  validate,
} from "../validators/Validator.js"; 


const router = express.Router(); 


router.get("/recettes", recipeController.getAllRecipes);
router.get(
  "/recettes/:id",
  validateUpdateRecipe(),
  validate,
  recipeController.getRecipeById,
);
router.post(
  "/recettes",
  validateCreateRecipe(),
  validate,
  recipeController.createRecipe,
);
router.put(
  "/recettes/:id",
  validateUpdateRecipe(),
  validate,
  recipeController.updateRecipe,
);
router.delete(
  "/recettes/:id",
  validateDeleteRecipe(),
  validate,
  recipeController.deleteRecipe,
);

export default router;
