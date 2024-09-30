/* eslint-disable */
// recipeController.test.js
import db from '../src/db.js'; // Import the database connection
import Recipe from '../src/models/recipe.js'; // Import your recipe model

describe('Recipe Model', () => {
  beforeAll(async () => {
    await db.connect(); // Connect to the database
  });

  afterAll(async () => {
    await db.end(); // Clean up and close the database connection
  });

  describe('Create Recipe', () => {
    it('should create a new recipe', async () => {
      const newRecipe = {
        titre: 'Pizza',
        ingredients: 'Flour, Cheese, Tomato Sauce',
        type: 'Main',
      };

      const result = await Recipe.createRecipe(newRecipe);
      expect(result).toHaveProperty('id');
      expect(result.titre).toBe(newRecipe.titre);
    });
  });

  // Add other test cases here...
});
