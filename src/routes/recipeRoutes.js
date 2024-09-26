import express from 'express';
const router = express.Router();
import recipeController from '../controllers/recipeController.js';
import recipeValidator from '../validators/recipeValidator.js';

const { validateCreateRecipe, validateUpdateRecipe, validateDeleteRecipe, validate } = recipeValidator;

router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', validateUpdateRecipe(), validate, recipeController.getRecipeById); // Utiliser validateUpdateRecipe ici
router.post('/recipes', validateCreateRecipe(), validate, recipeController.createRecipe);
router.put('/recipes/:id', validateUpdateRecipe(), validate, recipeController.updateRecipe);
router.delete('/recipes/:id', validateDeleteRecipe(), validate, recipeController.deleteRecipe);

export default router;
