import db from "../config/db.js"; // Assurez-vous que le chemin est correct

// Obtenir une recette par titre
const getRecipeByTitle = async (titre) => {
  const query = "SELECT * FROM recipes WHERE titre = ?";
  const [rows] = await db.query(query, [titre]);
  return rows.length > 0 ? rows[0] : null; // Retourne la recette ou null si elle n'existe pas
};

// Créer une nouvelle recette
const createRecipe = async (recipeData) => {
  const { titre, ingredients, type } = recipeData;
  const query =
    "INSERT INTO recipes (titre, ingredients, type) VALUES (?, ?, ?)";
  const [result] = await db.query(query, [titre, ingredients, type]);
  return { id: result.insertId, titre, ingredients, type };
};

// Obtenir toutes les recettes
const getAllRecipes = async () => {
  const query = "SELECT * FROM recipes";
  const [rows] = await db.query(query);
  return rows;
};

// Obtenir une recette par ID
const getRecipeById = async (id) => {
  // Ensure the ID is a valid number
  if (isNaN(id)) {
    throw new Error("Invalid ID format");
  }
  const query = "SELECT * FROM recipes WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const updateRecipe = async (id, recipeData) => {
  if (isNaN(id)) {
    throw new Error("Invalid ID format");
  }

  const { titre, ingredients, type } = recipeData;
  const query =
    "UPDATE recipes SET titre = ?, ingredients = ?, type = ? WHERE id = ?";
  await db.query(query, [titre, ingredients, type, id]);
  return { id, titre, ingredients, type };
};

// Supprimer une recette
const deleteRecipe = async (id) => {
  // Ensure the ID is a valid number
  if (isNaN(id)) {
    throw new Error("Invalid ID format");
  }

  const query = "DELETE FROM recipes WHERE id = ?";
  const result = await db.query(query, [id]);
  return result;
};

// Exportation des fonctions du modèle
export default {
  getRecipeByTitle,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
