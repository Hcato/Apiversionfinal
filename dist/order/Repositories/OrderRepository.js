"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class OrderRepository {
    static findAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT order_id, user_id_fk, total, status FROM `order`', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        resolve(users);
                    }
                });
            });
        });
    }
    static findByOrderId(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `order` WHERE order_id = ?', [order_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const users = results;
                        if (users.length > 0) {
                            resolve(users[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `order` WHERE user_id_fk = ?', [user_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const orders = results;
                        resolve(orders);
                    }
                });
            });
        });
    }
    static findByUserIdWithProducts(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                database_1.default.query(query, [user_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const orders = results;
                        resolve(orders);
                    }
                });
            });
        });
    }
    static createOrder(order, products) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderQuery = 'INSERT INTO `order` (user_id_fk, status, total, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const orderProductQuery = 'INSERT INTO `order_product` (order_id, product_id, amount) VALUES (?, ?, ?)';
            const updateProductStockQuery = 'UPDATE `product` SET amount = amount - ? WHERE product_id = ?';
            const connectionPromise = database_1.default.promise();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield connectionPromise.beginTransaction();
                    // Insert the order
                    const [orderResult] = yield connectionPromise.execute(orderQuery, [order.user_id, order.status, order.total, order.created_at, order.created_by, order.update_at, order.update_by, order.deleted]);
                    const createdOrderId = orderResult.insertId;
                    const createdOrder = Object.assign(Object.assign({}, order), { order_id: createdOrderId });
                    // Insert into order_product and update product stock
                    for (const product of products) {
                        yield connectionPromise.execute(orderProductQuery, [createdOrderId, product.product_id, product.amount]);
                        yield connectionPromise.execute(updateProductStockQuery, [product.amount, product.product_id]);
                    }
                    yield connectionPromise.commit();
                    resolve(createdOrder);
                }
                catch (error) {
                    yield connectionPromise.rollback();
                    reject(error);
                }
            }));
        });
    }
    static updateOrder(order_id, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE `order` SET user_id_fk = ?, status= ?, user_id = ?, total = ?, update_at = ?, update_by = ?, deleted = ? WHERE order_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [orderData.user_id, orderData.status, orderData.user_id, orderData.total, orderData.update_at, orderData.update_by, orderData.deleted, order_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedOrder = Object.assign(Object.assign({}, orderData), { order_id: order_id });
                            resolve(updatedOrder);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static updateSell(order_id, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE `order` SET status= ?, address = ?, update_at = ?, update_by = ? WHERE order_id = ?';
            console.log(orderData);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [orderData.status, orderData.address, orderData.update_at, orderData.update_by, order_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedOrder = Object.assign(Object.assign({}, orderData), { order_id: order_id });
                            resolve(updatedOrder);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProductsQuery = 'SELECT product_id, amount FROM `order_product` WHERE order_id = ?';
            const deleteOrderProductQuery = 'DELETE FROM `order_product` WHERE order_id = ?';
            const updateProductStockQuery = 'UPDATE `product` SET amount = amount + ? WHERE product_id = ?';
            const deleteOrderQuery = 'DELETE FROM `order` WHERE order_id = ?';
            const connectionPromise = database_1.default.promise();
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield connectionPromise.beginTransaction();
                    // Obtener los productos de la orden para actualizar el stock
                    const [products] = yield connectionPromise.execute(getProductsQuery, [order_id]);
                    // Actualizar el stock de productos
                    for (const product of products) {
                        yield connectionPromise.execute(updateProductStockQuery, [product.amount, product.product_id]);
                    }
                    // Eliminar las entradas en order_product
                    yield connectionPromise.execute(deleteOrderProductQuery, [order_id]);
                    // Eliminar la orden
                    const [deleteResult] = yield connectionPromise.execute(deleteOrderQuery, [order_id]);
                    yield connectionPromise.commit();
                    if (deleteResult.affectedRows > 0) {
                        resolve(true); // Eliminación exitosa
                    }
                    else {
                        resolve(false); // No se encontró la orden a eliminar
                    }
                }
                catch (error) {
                    yield connectionPromise.rollback();
                    reject(error);
                }
            }));
        });
    }
}
exports.OrderRepository = OrderRepository;
