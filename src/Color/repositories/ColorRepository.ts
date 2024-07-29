import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Color } from '../Model/Colormodel';

export class ColorRepository {

  public static async findAllColors(): Promise<Color[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT color_id, name FROM `color`', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Color[] = results as Color[];
          resolve(users);
        }
      });
    });
  }

  public static async findByColorId(color_id: number): Promise<Color | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `color` WHERE color_id = ?', [color_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const colors: Color[] = results as Color[];
          if (colors.length > 0) {
            resolve(colors[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByColorName(Name: string): Promise<Color| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `color` WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const colors: Color[] = results as Color[];
          if (colors.length > 0) {
            resolve(colors[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createColor(color: Color): Promise<Color> {
    const query = 'INSERT INTO `color` (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(color);
    return new Promise((resolve, reject) => {
      connection.execute(query, [color.name, color.created_at, color.created_by, color.update_at, color.update_by, color.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createColorId = result.insertId;
          const createdOrder: Color = { ...color, Color_id: createColorId };
          resolve(createdOrder);
        }
      });
    });
  }

  public static async updateColor(color_id: number, colorData: Color): Promise<Color | null> {
    const query = 'UPDATE `color` SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE color_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [ colorData.name, colorData.update_at, colorData.update_by, colorData.deleted, color_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedColor: Color = { ...colorData, Color_id: color_id };
            resolve(updatedColor);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteColor(color_id: number): Promise<boolean> {
    const query = 'DELETE FROM `color` WHERE color_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [color_id], (error, result: ResultSetHeader) => {
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