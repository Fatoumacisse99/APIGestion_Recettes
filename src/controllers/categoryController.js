import Category from '../models/categoryModel.js';
// import { validateCategory, validate } from '../validators/categoryValidator.js';

// Récupérer toutes les catégories
const getAllCategories = async (_req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération des catégories',
        error,
      });
  }
};

// Récupérer une catégorie par ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la récupération de la catégorie',
        error,
      });
  }
};

// Ajouter une nouvelle catégorie
const createCategory = async (req, res) => {
  const newCategory = req.body;
  try {
    const createdCategory = await Category.createCategory(newCategory);
    res.status(201).json(createdCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de l\'ajout de la catégorie', error });
  }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedCategory = await Category.updateCategory(id, updatedData);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la mise à jour de la catégorie',
        error,
      });
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedId = await Category.deleteCategory(id);
    res
      .status(200)
      .json({ message: `Catégorie avec ID ${deletedId} supprimée` });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Erreur lors de la suppression de la catégorie',
        error,
      });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
