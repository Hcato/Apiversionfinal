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
exports.ProductRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class ProductRepository {
    static findAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT product_id, category_id_fk, color_id_fk, size_id_fk, name, description, url, price, amount FROM product', (error, results) => {
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
    static findByProductId(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM product WHERE product_id = ?', [product_id], (error, results) => {
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
    static findProductsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM product WHERE category_id_fk = ?';
                database_1.default.query(query, [categoryId], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results;
                        resolve(products);
                    }
                });
            });
        });
    }
    static findByProductName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM product WHERE name = ?', [Name], (error, results) => {
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
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO product (category_id_fk, color_id_fk, size_id_fk, name, description, url, price, amount, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            console.log(product);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [product.category_id_fk, product.color_id_fk, product.size_id_fk, product.name, product.description, product.url, product.price, product.total_amount, product.created_at, product.created_by, product.update_at, product.update_by, product.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdProductId = result.insertId;
                        const createProduct = Object.assign(Object.assign({}, product), { product_id: createdProductId });
                        resolve(createProduct);
                    }
                });
            });
        });
    }
    static updateProduct(product_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE product SET category_id_fk = ?, color_id_fk = ?, size_id_fk = ?, name = ?, description = ?, url = ?, price = ?, amount = ? , update_at = ?, update_by = ?, deleted = ? WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [productData.category_id_fk, productData.color_id_fk, productData.size_id_fk, productData.name, productData.description, productData.url, productData.price, productData.total_amount, productData.update_at, productData.update_by, productData.deleted, product_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, productData), { product_id: product_id });
                            resolve(updatedEmployee);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM product WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [product_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true); // Eliminación exitosa
                        }
                        else {
                            resolve(false); // Si no se encontró el usuario a eliminar
                        }
                    }
                });
            });
        });
    }
}
exports.ProductRepository = ProductRepository;
