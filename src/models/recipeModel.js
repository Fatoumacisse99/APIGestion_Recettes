// // recipeModel.js
// import db from '../config/db';

// // Obtenir une recette par titre
// const getRecipeByTitle = async (titre) => {
//   const query = 'SELECT * FROM recipes WHERE titre = ?';
//   const [rows] = await db.query(query, [titre]);
//   return rows.length > 0 ? rows[0] : null; // Retourne la recette ou null si elle n'existe pas
// };

// // Créer une nouvelle recette
// const createRecipe = async (recipeData) => {
//   const { titre, ingredients, type, categorie_id } = recipeData;
//   const query =
//     'INSERT INTO recipes (titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)';
//   const [result] = await db.query(
//     query,
//     [titre, ingredients, type],
//     categorie_id,
//   );
//   return { id: result.insertId, titre, ingredients, type, categorie_id };
// };

// // Obtenir toutes les recettes
// const getAllRecipes = async () => {
//   const query = 'SELECT * FROM recipes';
//   const [rows] = await db.query(query);
//   return rows;
// };

// // Obtenir une recette par ID
// const getRecipeById = async (id) => {
//   const query = 'SELECT * FROM recipes WHERE id = ?';
//   const [rows] = await db.query(query, [id]);
//   return rows.length > 0 ? rows[0] : null;
// };

// // Mettre à jour une recette
// const updateRecipe = async (id, recipeData) => {
//   const { titre, ingredients, type, categorie_id } = recipeData;
//   const query =
//     'UPDATE recipes SET titre = ?, ingredients = ?, type = ?, categorie_id= ? WHERE id = ?';
//   await db.query(query, [titre, ingredients, type, categorie_id, id]);
//   return { id, titre, ingredients, type, categorie_id };
// };

// // Supprimer une recette
// const deleteRecipe = async (id) => {
//   const query = 'DELETE FROM recipes WHERE id = ?';
//   const [result] = await db.query(query, [id]);
//   return result; // Retourne le résultat de la requête
// };

// export default {
//   getRecipeByTitle,
//   createRecipe,
//   getAllRecipes,
//   getRecipeById,
//   updateRecipe,
//   deleteRecipe,
// };
