import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { OrderProduct } from '../Model/OpModel';

export class OPRepository {

  public static async findAllOP(): Promise<OrderProduct[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_product_id, order_id_fk, product_id_fk, amount FROM order_product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: OrderProduct[] = results as OrderProduct[];
          resolve(users);
        }
      });
    });
  }

  public static async findByROPId(op_id: number): Promise<OrderProduct | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM order_product WHERE order_product_id = ?', [op_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: OrderProduct[] = results as OrderProduct[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createOP(OP: OrderProduct): Promise<OrderProduct> {
    const query = 'INSERT INTO order_product (order_id_fk, product_id_fk, amount) VALUES (?, ?, ?)';
    console.log(OP);
    return new Promise((resolve, reject) => {
      connection.execute(query, [OP.order_id_fk,OP.product_id_fk, OP.amount], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOPId = result.insertId;
          const createdOP: OrderProduct = { ...OP, orderproduct_id: createdOPId };
          resolve(createdOP);
        }
      });
    });
  }

  public static async updateOP(op_id: number, opData: OrderProduct): Promise<OrderProduct | null> {
    const query = 'UPDATE order_product SET order_id_fk = ?, product_id_fk = ?, amount = ? WHERE order_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [opData.order_id_fk, opData.product_id_fk, opData.amount, op_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrderProduct: OrderProduct = { ...opData, orderproduct_id: op_id };
            resolve(updatedOrderProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteOP(op_id: number): Promise<boolean> {
    const query = 'DELETE FROM order_product WHERE order_product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [op_id], (error, result: ResultSetHeader) => {
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