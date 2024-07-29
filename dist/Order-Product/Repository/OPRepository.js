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
exports.OPRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class OPRepository {
    static findAllOP() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT order_product_id, order_id_fk, product_id_fk, amount FROM order_product', (error, results) => {
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
    static findByROPId(op_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM order_product WHERE order_product_id = ?', [op_id], (error, results) => {
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
    static createOP(OP) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO order_product (order_id_fk, product_id_fk, amount) VALUES (?, ?, ?)';
            console.log(OP);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [OP.order_id_fk, OP.product_id_fk, OP.amount], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdOPId = result.insertId;
                        const createdOP = Object.assign(Object.assign({}, OP), { orderproduct_id: createdOPId });
                        resolve(createdOP);
                    }
                });
            });
        });
    }
    static updateOP(op_id, opData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE order_product SET order_id_fk = ?, product_id_fk = ?, amount = ? WHERE order_product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [opData.order_id_fk, opData.product_id_fk, opData.amount, op_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedOrderProduct = Object.assign(Object.assign({}, opData), { orderproduct_id: op_id });
                            resolve(updatedOrderProduct);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteOP(op_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM order_product WHERE order_product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [op_id], (error, result) => {
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
exports.OPRepository = OPRepository;
