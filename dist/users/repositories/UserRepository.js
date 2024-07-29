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
exports.UserRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class UserRepository {
    static findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT user_id, rol_id_fk, first_name, last_name, email FROM users', (error, results) => {
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
    static findByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error, results) => {
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
    static findByUserName(first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM users WHERE first_name = ?', [first_name], (error, results) => {
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
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO users (rol_id_fk, first_name, last_name, email, password, created_by, created_at, update_by, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            console.log(user);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [user.rol_id, user.first_name, user.last_name, user.email, user.password, user.created_by, user.created_at, user.update_by, user.update_at], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdUserId = result.insertId;
                        const createdUser = Object.assign(Object.assign({}, user), { user_id: createdUserId });
                        resolve(createdUser);
                    }
                });
            });
        });
    }
    static updateUser(user_id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE users SET rol_id_fk = ?, first_name = ?, last_name = ?, email = ?, password = ?, update_at = ?, update_by = ?, deleted = ? WHERE user_id = ?';
            console.log(userData);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [userData.rol_id, userData.first_name, userData.last_name, userData.email, userData.password, userData.update_at, userData.update_by, userData.deleted, user_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, userData), { user_id: user_id });
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
    static deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM users WHERE user_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [user_id], (error, result) => {
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
exports.UserRepository = UserRepository;
