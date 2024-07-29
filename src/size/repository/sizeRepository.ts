import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Size } from '../Model/sizeModel';

export class SizeRepository {

  public static async findAllSize(): Promise<Size[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT size_id, name FROM size', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Size[] = results as Size[];
          resolve(users);
        }
      });
    });
  }

  public static async findBySizeId(size_id: number): Promise<Size | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM size WHERE size_id = ?', [size_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Size[] = results as Size[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null); 
          }
        }
      });
    });
  }

  public static async findBySizeName(Name: string): Promise<Size| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM size WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Size[] = results as Size[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createSize(size: Size): Promise<Size> {
    const query = 'INSERT INTO size (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(size);
    return new Promise((resolve, reject) => {
      connection.execute(query, [size.name, size.created_at, size.created_by, size.update_at, size.update_by, size.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: Size = { ...size, size_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateSize(rol_id: number, rolData: Size): Promise<Size | null> {
    const query = 'UPDATE size SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE size_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rolData.name, rolData.update_at, rolData.update_by, rolData.deleted, rol_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Size = { ...rolData, size_id: rol_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteSize(size_id: number): Promise<boolean> {
    const query = 'DELETE FROM size WHERE size_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [size_id], (error, result: ResultSetHeader) => {
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