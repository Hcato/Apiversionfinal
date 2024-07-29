import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Product } from '../models/productmodel';

export class ProductRepository {

  public static async findAllProduct(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product_id, category_id_fk, color_id_fk, size_id_fk, name, description, url, price, amount FROM product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          resolve(users);
        }
      });
    });
  }

  public static async findByProductId(product_id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE product_id = ?', [product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  public static async findProductsByCategory(categoryId: number): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product WHERE category_id_fk = ?'; 
      connection.query(query, [categoryId], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          resolve(products);
        }
      });
    });
  }
  
  public static async findByProductName(Name: string): Promise<Product| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const query = 'INSERT INTO product (category_id_fk, color_id_fk, size_id_fk, name, description, url, price, amount, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(product);
    return new Promise((resolve, reject) => {
      connection.execute(query, [product.category_id_fk, product.color_id_fk, product.size_id_fk, product.name, product.description, product.url, product.price, product.total_amount, product.created_at, product.created_by, product.update_at, product.update_by, product.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductId = result.insertId;
          const createProduct: Product = { ...product, product_id: createdProductId };
          resolve(createProduct);
        }
      });
    });
  }

  public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
    const query = 'UPDATE product SET category_id_fk = ?, color_id_fk = ?, size_id_fk = ?, name = ?, description = ?, url = ?, price = ?, amount = ? , update_at = ?, update_by = ?, deleted = ? WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productData.category_id_fk, productData.color_id_fk, productData.size_id_fk, productData.name, productData.description, productData.url, productData.price, productData.total_amount, productData.update_at ,productData.update_by, productData.deleted, product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Product = { ...productData, product_id: product_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    const query = 'DELETE FROM product WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product_id], (error, result: ResultSetHeader) => {
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