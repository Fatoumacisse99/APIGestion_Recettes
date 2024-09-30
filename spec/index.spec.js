// import Recipe from "../src/models/Recipe.js";
// describe("Recipe tests", () => {
//   let recipeId = null;

//   it("can be created", async () => {
//     const recipe = { titre: "crepe", type: "dessert", ingredients: "farine" };
//     const result = await Recipe.createRecipe(recipe.titre, recipe.type, recipe.ingredients);
//     recipeId = result.id;
//     const recipeCreated = await Recipe.getRecipeById(recipeId);
//     expect(recipeId).not.toBeNull();
//     expect(recipeCreated).not.toBeNull();
//     expect(recipeCreated.titre).toBe(recipe.titre);
//   });

//   it("cannot be created with missing title", async () => {
//     try {
//       const recipe = { titre: null, type: "dessert", ingredients: "farine" };
//       await Recipe.createRecipe(recipe.titre, recipe.type, recipe.ingredients);
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });

//   it("can get all recipes", async () => {
//     const getAll = await Recipe.getAllRecipes();
//     expect(getAll).not.toBeNull();
//     expect(Array.isArray(getAll)).toBe(true);
//   });

//   it("can get a recipe by ID", async () => {
//     const recipe = { titre: "crepe", type: "dessert", ingredients: "farine" };
//     const createdRecipe = await Recipe.createRecipe(recipe.titre, recipe.type, recipe.ingredients);
//     const recipeRetrieved = await Recipe.getRecipeById(createdRecipe.id);
//     expect(recipeRetrieved).not.toBeNull();
//     expect(recipeRetrieved.titre).toBe(recipe.titre);
//   });

//   it("returns null for a non-existent recipe by ID", async () => {
//     const recipeRetrieved = await Recipe.getRecipeById(9999); // ID qui n'existe pas
//     expect(recipeRetrieved).toBeNull();
//   });

//   it("can update a recipe", async () => {
//     const recipe = { titre: "crepe", type: "dessert", ingredients: "farine" };
//     const createdRecipe = await Recipe.createRecipe(recipe.titre, recipe.type, recipe.ingredients);

//     const updatedData = { titre: "crepe updated", ingredients: "farine et sucre", type: "dessert" };
//     await Recipe.updateRecipe(createdRecipe.id, updatedData);

//     const updatedRecipe = await Recipe.getRecipeById(createdRecipe.id);
//     expect(updatedRecipe.titre).toBe(updatedData.titre);
//   });

//   it("can delete a recipe", async () => {
//     const recipe = { titre: "crepe", type: "dessert", ingredients: "farine" };
//     const createdRecipe = await Recipe.createRecipe(recipe.titre, recipe.type, recipe.ingredients);

//     await Recipe.deleteRecipe(createdRecipe.id);
//     const recipeDeleted = await Recipe.getRecipeById(createdRecipe.id);
//     expect(recipeDeleted).toBeNull();
//   });

//   it("returns null when trying to delete a non-existent recipe", async () => {
//     const result = await Recipe.deleteRecipe(9999);
//     expect(result).toBeNull();
//   });
// });
