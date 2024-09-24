// const express = require('express');
// const router = express.Router();
// const recipeController = require('../controllers/recipeController');

// // Importer les validateurs
// const { 
//   validateCreateRecipe, 
//   validateUpdateRecipe, 
//   validateDeleteRecipe, 
//   validate 
// } = require('../validators/recipeValidator');

// // Définir les routes CRUD avec validation
// router.get('/recipes', recipeController.getAllRecipes);
// router.get('/recipes/:id', validateDeleteRecipe(), validate, recipeController.getRecipeById);
// router.post('/recipes', validateCreateRecipe(), validate, recipeController.createRecipe);
// router.put('/recipes/:id', validateUpdateRecipe(), validate, recipeController.updateRecipe);
// router.delete('/recipes/:id', validateDeleteRecipe(), validate, recipeController.deleteRecipe);

// module.exports = router;
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Importer les validateurs
const { 
  validateCreateRecipe, 
  validateUpdateRecipe, 
  validateDeleteRecipe, 
  validate 
} = require('../validators/recipeValidator');

// Définir les routes CRUD avec validation
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', validateUpdateRecipe(), validate, recipeController.getRecipeById); // Utiliser validateUpdateRecipe ici
router.post('/recipes', validateCreateRecipe(), validate, recipeController.createRecipe);
router.put('/recipes/:id', validateUpdateRecipe(), validate, recipeController.updateRecipe);
router.delete('/recipes/:id', validateDeleteRecipe(), validate, recipeController.deleteRecipe);

module.exports = router;
