import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { validateCategory, validate } from '../validators/categoryValidator.js'; // Importer le validateur

const router = express.Router();

// Récupérer toutes les catégories
router.get('/', getAllCategories);

// Récupérer une catégorie par ID
router.get('/:id', getCategoryById);

// Ajouter une nouvelle catégorie
router.post('/', validateCategory, validate, createCategory); // Appliquer le validateur ici

// Mettre à jour une catégorie
router.put('/:id', validateCategory, validate, updateCategory); // Appliquer le validateur ici

// Supprimer une catégorie
router.delete('/:id', deleteCategory);

export default router;
