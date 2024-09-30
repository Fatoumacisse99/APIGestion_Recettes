// categoryModel.js
import db from '../config/db.js'; 
class Category {
  // Récupérer toutes les catégories
  static async getAllCategories() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  // Récupérer une catégorie par ID
  static async getCategoryById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    
    return rows[0]; // Retourne la catégorie si elle existe, sinon undefined
  }
  // Ajouter une nouvelle catégorie
  static async createCategory(category) {
    const { name } = category;
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [
      name,
    ]);
    return { id: result.insertId, name };
  }

  // Mettre à jour une catégorie
  static async updateCategory(id, category) {
    const { name } = category;
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    return { id, name };
  }

  // Supprimer une catégorie
  static async deleteCategory(id) {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return result;
  }
}

export default Category;
