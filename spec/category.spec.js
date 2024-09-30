import categoryModel from '../src/models/categoryModel.js'; // Assurez-vous que ce chemin est correct
import db from '../src/config/db.js'; // Assurez-vous que ce chemin est correct

describe('tests du modèle Category', () => {
  beforeEach(async () => {
    await db.query('DELETE FROM recipes');
    await db.query('DELETE FROM categories');

    // Insertion des données initiales pour les tests
    await db.query(`INSERT INTO categories (id, name) VALUES
      (1, 'Dessert'),
      (2, 'Entree'),
      (3, 'Plat principal'),
      (4, 'Boisson'),
      (5, 'Snack');`);
  });

  it('Doit récupérer toutes les catégories', async () => {
    const categories = await categoryModel.getAllCategories();
    expect(categories.length).toBe(5);
  });

  it('Doit récupérer une catégorie par ID', async () => {
    const category = await categoryModel.getCategoryById(1); 
    expect(category).toBeDefined(); 
    expect(category.name).toBe('Dessert');
  });

  it('Doit ajouter une nouvelle catégorie', async () => {
    const newCategory = {
      name: 'Nouvelle Catégorie',
    };

    const createdCategory = await categoryModel.createCategory(newCategory);

    expect(createdCategory).not.toBeNull();
    expect(createdCategory.name).toBe(newCategory.name);
  });

  it('Doit mettre à jour une catégorie existante', async () => {
    const categoryIdToUpdate = 1;
    const updatedData = {
      name: 'Catégorie Mise à Jour',
    };
    await categoryModel.updateCategory(categoryIdToUpdate, updatedData);
    
    const updatedCategory = await categoryModel.getCategoryById(categoryIdToUpdate);
    expect(updatedCategory.name).toBe(updatedData.name);
  });

  it('Doit supprimer une catégorie existante', async () => {
    const newCategory = {
      name: 'Catégorie à supprimer',
    };
    const createdCategory = await categoryModel.createCategory(newCategory);
    
    const deleteResult = await categoryModel.deleteCategory(createdCategory.id);
    expect(deleteResult.affectedRows).toBe(1);
  });
});

