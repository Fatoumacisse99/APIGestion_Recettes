/* eslint-disable */

import recipeModel from '../src/models/Recipe.js';
const { updateRecipe } = recipeModel; 
import categoryModel from '../src/models/categoryModel.js';
import db from '../src/config/db.js';

describe('tests du modèle Recipe', () => {
  // Avant chaque it, on réinitialise la table recipes
  beforeAll(async () => {
    await db.query('TRUNCATE TABLE recipes');

    // Insertion des données initiales pour les its
    await db.query(`
      INSERT INTO recipes (titre, ingredients, type, categorie_id) VALUES
      ('Tiramisu', 'Mascarpone, Cafe, Biscuits', 'Dessert', 1),
      ('Mousse au chocolat', 'Chocolat, Oeufs, Creme', 'Dessert', 1),
      ('Creme brulee', 'Creme, Vanille, Sucre', 'Dessert', 1),
      ('Salade Cesar', 'Laitue, Poulet, Croutons', 'Entree', 2),
      ('Soupe de tomate', 'Tomates, Oignons, Basilic', 'Entree', 2),
      ('Bruschetta', 'Pain, Tomates, Ail', 'Entree', 2),
      ('Couscous', 'Semoule, Legumes, Agneau', 'Plat principal', 3),
      ('Poulet roti', 'Poulet, Ail, Romarin', 'Plat principal', 3),
      ('Lasagnes', 'Pates, Viande, Sauce tomate', 'Plat principal', 3),
      ('Smoothie Fraise', 'Fraise, Lait, Sucre', 'Boisson', 4),
      ('Limonade', 'Citron, Eau, Sucre', 'Boisson', 4),
      ('Tacos', 'Tortilla, Viande, Legumes', 'Snack', 5),
      ('Pizza Margarita', 'Tomates, Mozzarella, Basilic', 'Snack', 5);
      
    `);
  });

  it('Doit récupérer toutes les recettes', async () => {
    const recipes = await recipeModel.getAllRecipes();
    expect(recipes.length).toBe(13); 
  });

  it('Doit récupérer une recette par ID', async () => {
    const recipe = await recipeModel.getRecipeById(1);
    expect(recipe.titre).toBe('Tiramisu');
    expect(recipe.ingredients).toBe('Mascarpone, Cafe, Biscuits'); 
  });

  it('Doit ajouter une nouvelle recette', async () => {
    const newRecipe = {
      titre: 'Nouvelle recette',
      ingredients: 'Ingrédients',
      type: 'Type de recette',
      categorie_id: 1,
    };

    const createdRecipe = await recipeModel.createRecipe(newRecipe);

    expect(createdRecipe).not.toBeNull();
    expect(createdRecipe.titre).toBe(newRecipe.titre);
    expect(createdRecipe.ingredients).toBe(newRecipe.ingredients);
    expect(createdRecipe.type).toBe(newRecipe.type);
  });
  

  it('Doit mettre à jour une recette existante', async () => {
    const recipeIdToUpdate = 1;
    const updatedData = {
      titre: 'Nouvelle Recette Mise à Jour',
      ingredients: 'Ingrédient A, Ingrédient B',
      type: 'Plat principal',
      categorie_id: 2,
    };
    spyOn(recipeModel, 'updateRecipe').and.returnValue(
      Promise.resolve({
        id: recipeIdToUpdate,
        ...updatedData,
      }),
    );
    const result = await recipeModel.updateRecipe(
      recipeIdToUpdate,
      updatedData,
    );
    expect(result.id).toBe(recipeIdToUpdate);
    expect(result.titre).toBe(updatedData.titre);
  });

  it('Doit supprimer une recette existante', async () => {
    const newRecipe = {
      titre: 'Recette à supprimer',
      ingredients: 'Ingrédients',
      type: 'Type de recette',
      categorie_id: 3,
    };
    const createdRecipe = await recipeModel.createRecipe(newRecipe);
    spyOn(recipeModel, 'deleteRecipe').and.returnValue(
      Promise.resolve({
        affectedRows: 1,
      }),
    );
    const deleteResult = await recipeModel.deleteRecipe(createdRecipe.id);
    expect(deleteResult.affectedRows).toBe(1);
  });
});
