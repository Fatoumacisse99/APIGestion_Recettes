import RecipeModel from "../src/models/Recipe.js";
import db from "../src/config/db.js";

describe("Recipe Model with Real Database", () => {
  beforeEach(async () => {
    
    await db.query("DELETE FROM recettes");
  });

  
  it("01 - should create a new recipe", async () => {
    const uniqueTitle = "New Recipe " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,          
      ingredients: "Some ingredients",
      type: "Main",               
    };
    const result = await RecipeModel.createRecipe(newRecipe);
    expect(result.id).toBeDefined(); 
  });

  it("02 - should retrieve a recipe by ID", async () => {
    const uniqueTitle = "Retrieve Me " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,
      ingredients: "Ingredients",
      type: "Main",
    };
    const createdRecipe = await RecipeModel.createRecipe(newRecipe);
    const recipe = await RecipeModel.getRecipeById(createdRecipe.id);
    expect(recipe).toBeDefined();
    expect(recipe.id).toBe(createdRecipe.id);
  });

  it("03 - should update a recipe", async () => {
    const uniqueTitle = "Recipe to Update " + Date.now();
    const createdRecipe = await RecipeModel.createRecipe({
      titre: uniqueTitle,
      ingredients: "Ingredients",
      type: "Main",
    });

    const updatedRecipeData = {
      titre: "Updated Recipe " + Date.now(),
      ingredients: "Updated ingredients",
      type: "Dessert",
    };
    const updatedRecipe = await RecipeModel.updateRecipe(
      createdRecipe.id,
      updatedRecipeData,
    );

    expect(updatedRecipe.titre).toBe(updatedRecipeData.titre);
    expect(updatedRecipe.id).toBe(createdRecipe.id);
  });

  it("04 - should retrieve a recipe by title", async () => {
    const uniqueTitle = "Test Recipe " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,
      ingredients: "Some ingredients",
      type: "Main",
    };
    await RecipeModel.createRecipe(newRecipe);

    const recipe = await RecipeModel.getRecipeByTitle(uniqueTitle);
    expect(recipe).toBeDefined();
    expect(recipe.titre).toBe(uniqueTitle);
  });

  it("05 - should return null for a non-existent recipe by title", async () => {
    const recipe = await RecipeModel.getRecipeByTitle("Non-existent Title");
    expect(recipe).toBeNull();
  });

  it("06 - should delete a recipe", async () => {
    const newRecipe = {
      titre: "Recipe to Delete",
      ingredients: "Ingredients",
      type: "Main",
    };
    const createdRecipe = await RecipeModel.createRecipe(newRecipe);

    const deletedRecipe = await RecipeModel.deleteRecipe(createdRecipe.id);
    expect(deletedRecipe).not.toBeNull();

    // Vérifiez que la recette n'existe plus après la suppression
    const recipeAfterDelete = await RecipeModel.getRecipeById(createdRecipe.id);
    expect(recipeAfterDelete).toBeNull();
  });
});
