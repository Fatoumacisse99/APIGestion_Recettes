
import express from ('express');
import router from express.Router();
import recipeController from ('../controllers/recipeController');

// Importer les validateurs
import { 
  validateCreateRecipe, 
  validateUpdateRecipe, 
  validateDeleteRecipe, 
  validate 
} from ('../validators/recipeValidator');

// Définir les routes CRUD avec validation
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', validateUpdateRecipe(), validate, recipeController.getRecipeById); // Utiliser validateUpdateRecipe ici
router.post('/recipes', validateCreateRecipe(), validate, recipeController.createRecipe);
router.put('/recipes/:id', validateUpdateRecipe(), validate, recipeController.updateRecipe);
router.delete('/recipes/:id', validateDeleteRecipe(), validate, recipeController.deleteRecipe);

module.exports = router;

