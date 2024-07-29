import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {

  public static async findAllUser(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, rol_id_fk, first_name, last_name, email FROM users', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findByUserId(user_id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByUserName(first_name: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE first_name = ?', [first_name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO users (rol_id_fk, first_name, last_name, email, password, created_by, created_at, update_by, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(user);
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.rol_id,user.first_name, user.last_name, user.email, user.password, user.created_by, user.created_at, user.update_by, user.update_at], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, user_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE users SET rol_id_fk = ?, first_name = ?, last_name = ?, email = ?, password = ?, update_at = ?, update_by = ?, deleted = ? WHERE user_id = ?';
    console.log(userData);
    
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.rol_id, userData.first_name, userData.last_name, userData.email, userData.password, userData.update_at, userData.update_by, userData.deleted, user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: User = { ...userData, user_id: user_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
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