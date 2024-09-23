const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Define CRUD routes
router.get('/recipe', recipeController.getAllRecipes);
router.post('/recipes', recipeController.createRecipe);
router.put('/recipe/:id', recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);

module.exports = router;
