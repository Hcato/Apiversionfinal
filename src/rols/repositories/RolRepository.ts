import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Rol } from '../models/RolModel';

export class RolRepository {

  public static async findAllRol(): Promise<Rol[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT rol_id, name, description FROM role', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Rol[] = results as Rol[];
          resolve(users);
        }
      });
    });
  }

  public static async findByRolId(rol_id: number): Promise<Rol | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role WHERE rol_id = ?', [rol_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Rol[] = results as Rol[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByRoleName(Name: string): Promise<Rol| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM role WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Rol[] = results as Rol[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createRol(rol: Rol): Promise<Rol> {
    const query = 'INSERT INTO role (name, description, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log(rol);
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol.name, rol.description, rol.created_at, rol.created_by, rol.update_at, rol.update_by, rol.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: Rol = { ...rol, rol_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateRol(rol_id: number, rolData: Rol): Promise<Rol | null> {
    const query = 'UPDATE role SET name = ?, description=?, update_at = ?, update_by = ?, deleted = ? WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rolData.name, rolData.description, rolData.update_at, rolData.update_by, rolData.deleted, rol_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Rol = { ...rolData, rol_id: rol_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteRol(rol_id: number): Promise<boolean> {
    const query = 'DELETE FROM role WHERE rol_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [rol_id], (error, result: ResultSetHeader) => {
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