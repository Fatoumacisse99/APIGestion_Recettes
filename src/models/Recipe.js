import db from "../config/db.js"; // Assurez-vous que le chemin est correct

// Obtenir une recette par titre
const getRecipeByTitle = async (titre) => {
  const query = "SELECT * FROM recettes WHERE titre = ?";
  const [rows] = await db.query(query, [titre]);
  return rows[0] || null;
};

// Créer une nouvelle recette
const createRecipe = async (recipeData) => {
  const { titre, ingredients, type } = recipeData;
  const query = "INSERT INTO recettes (titre, ingredients, type) VALUES (?, ?, ?)";
  
  try {
    const [result] = await db.query(query, [titre, ingredients, type]);
    return { id: result.insertId, titre, ingredients, type };
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    throw new Error("Erreur lors de la création de la recette");
  }
};

// Obtenir toutes les recettes
const getAllRecipes = async () => {
  const query = "SELECT * FROM recettes";
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    throw new Error("Erreur lors de la récupération des recettes");
  }
};

// Obtenir une recette par ID
const getRecipeById = async (id) => {
  if (isNaN(id) || id <= 0) {
    throw new Error("ID invalide. Il doit être un entier positif.");
  }
  const query = "SELECT * FROM recettes WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows[0] || null;
};

// Mettre à jour une recette
const updateRecipe = async (id, recipeData) => {
  if (isNaN(id) || id <= 0) {
    throw new Error("ID invalide. Il doit être un entier positif.");
  }

  const { titre, ingredients, type } = recipeData;
  const query = "UPDATE recettes SET titre = ?, ingredients = ?, type = ? WHERE id = ?";
  const [result] = await db.query(query, [titre, ingredients, type, id]);

  if (result.affectedRows === 0) {
    return null; // L'ID n'existe pas
  }

  return { id, titre, ingredients, type };
};

// Supprimer une recette
const deleteRecipe = async (id) => {
  if (isNaN(id) || id <= 0) {
    throw new Error("ID invalide. Il doit être un entier positif.");
  }

  const query = "DELETE FROM recettes WHERE id = ?";
  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    return null; // Aucune ligne supprimée, l'ID n'existe pas
  }

  return { message: "Recette supprimée avec succès" };
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
