import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Category } from '../models/categoryModel';

export class CategoryRepository {

  public static async findAllCategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT category_id, name FROM category', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const categories: Category[] = results as Category[];
          resolve(categories);
        }
      });
    });
  }

  public static async findByCategoryrId(category_id: number): Promise<Category | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE category_id = ?', [category_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const categories: Category[] = results as Category[];
          if (categories.length > 0) {
            resolve(categories[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByCategoryName(Name: string): Promise<Category| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Category[] = results as Category[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createCategory(category: Category): Promise<Category> {
    const query = 'INSERT INTO category (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(category);
    return new Promise((resolve, reject) => {
      connection.execute(query, [category.name,category.created_at, category.created_by, category.update_at, category.update_by, category.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdCategoryId = result.insertId;
          const createdCategory: Category = { ...category, category_id: createdCategoryId };
          resolve(createdCategory);
        }
      });
    });
  }

  public static async updateUser(category_id: number, categoryData: Category): Promise<Category | null> {
    const query = 'UPDATE category SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE category_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [categoryData.name, categoryData.update_at, categoryData.update_by, categoryData.deleted, category_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedCategory: Category = { ...categoryData, category_id: category_id };
            resolve(updatedCategory);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteCategory(category_id: number): Promise<boolean> {
    const query = 'DELETE FROM category WHERE category_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [category_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}