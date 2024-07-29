import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Ordermodel';
import { OrderWithProducts } from '../models/OrderWithProducts';
export class OrderRepository {

  public static async findAllOrder(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, user_id_fk, total, status FROM `order`', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Order[] = results as Order[];
          resolve(users);
        }
      });
    });
  }

  public static async findByOrderId(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `order` WHERE order_id = ?', [order_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Order[] = results as Order[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByUserId(user_id: number): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `order` WHERE user_id_fk = ?', [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          resolve(orders);
        }
      });
    });
  }

  public static async findByUserIdWithProducts(user_id: number): Promise<OrderWithProducts[]> {
    return new Promise((resolve, reject) => {
      if (isNaN(user_id)) {
        return reject(new Error("Invalid user ID"));
      }
      const query = `
        SELECT 
          o.order_id, 
          o.user_id_fk, 
          o.status, 
          o.total,
          op.product_id, 
          op.amount,
          p.name,
          p.description,
          p.url,
          p.price
        FROM \`order\` o
        LEFT JOIN order_product op ON o.order_id = op.order_id
        LEFT JOIN product p ON op.product_id = p.product_id
        WHERE o.user_id_fk = ?
      `;
      connection.query(query, [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: OrderWithProducts[] = results as OrderWithProducts[];
          resolve(orders);
        }
      });
    });
  }

  public static async createOrder(order: Order, products: { product_id: number, amount: number }[]): Promise<Order> {
    const orderQuery = 'INSERT INTO `order` (user_id_fk, status, total, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const orderProductQuery = 'INSERT INTO `order_product` (order_id, product_id, amount) VALUES (?, ?, ?)';
    const updateProductStockQuery = 'UPDATE `product` SET amount = amount - ? WHERE product_id = ?';

    const connectionPromise = connection.promise();

    return new Promise(async (resolve, reject) => {
        try {
            await connectionPromise.beginTransaction();

            // Insert the order
            const [orderResult] = await connectionPromise.execute<ResultSetHeader>(orderQuery, [order.user_id, order.status, order.total, order.created_at, order.created_by, order.update_at, order.update_by, order.deleted]);
            const createdOrderId = orderResult.insertId;
            const createdOrder: Order = { ...order, order_id: createdOrderId };

            // Insert into order_product and update product stock
            for (const product of products) {
                await connectionPromise.execute(orderProductQuery, [createdOrderId, product.product_id, product.amount]);
                await connectionPromise.execute(updateProductStockQuery, [product.amount, product.product_id]);
            }

            await connectionPromise.commit();
            resolve(createdOrder);
        } catch (error) {
            await connectionPromise.rollback();
            reject(error);
        }
    });
  }



  public static async updateOrder(order_id: number, orderData: Order): Promise<Order | null> {
    const query = 'UPDATE `order` SET user_id_fk = ?, status= ?, user_id = ?, total = ?, update_at = ?, update_by = ?, deleted = ? WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderData.user_id, orderData.status, orderData.user_id, orderData.total, orderData.update_at, orderData.update_by, orderData.deleted, order_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrder: Order = { ...orderData, order_id: order_id };
            resolve(updatedOrder);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async updateSell(order_id: number, orderData: Order): Promise<Order | null> {
    const query = 'UPDATE `order` SET status= ?, address = ?, update_at = ?, update_by = ? WHERE order_id = ?';
    console.log(orderData);
    
    return new Promise((resolve, reject) => {
      connection.execute(query, [ orderData.status, orderData.address, orderData.update_at, orderData.update_by, order_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrder: Order = { ...orderData, order_id: order_id };
            resolve(updatedOrder);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteOrder(order_id: number): Promise<boolean> {
    const getProductsQuery = 'SELECT product_id, amount FROM `order_product` WHERE order_id = ?';
    const deleteOrderProductQuery = 'DELETE FROM `order_product` WHERE order_id = ?';
    const updateProductStockQuery = 'UPDATE `product` SET amount = amount + ? WHERE product_id = ?';
    const deleteOrderQuery = 'DELETE FROM `order` WHERE order_id = ?';

    const connectionPromise = connection.promise();

    return new Promise(async (resolve, reject) => {
        try {
            await connectionPromise.beginTransaction();

            // Obtener los productos de la orden para actualizar el stock
            const [products] = await connectionPromise.execute(getProductsQuery, [order_id]);
            
            // Actualizar el stock de productos
            for (const product of products as any[]) {
                await connectionPromise.execute(updateProductStockQuery, [product.amount, product.product_id]);
            }

            // Eliminar las entradas en order_product
            await connectionPromise.execute(deleteOrderProductQuery, [order_id]);

            // Eliminar la orden
            const [deleteResult] = await connectionPromise.execute<ResultSetHeader>(deleteOrderQuery, [order_id]);

            await connectionPromise.commit();

            if (deleteResult.affectedRows > 0) {
                resolve(true); // Eliminación exitosa
            } else {
                resolve(false); // No se encontró la orden a eliminar
            }
        } catch (error) {
            await connectionPromise.rollback();
            reject(error);
        }
    });
}

}