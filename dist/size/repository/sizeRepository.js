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
exports.SizeRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class SizeRepository {
    static findAllSize() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT size_id, name FROM size', (error, results) => {
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
    static findBySizeId(size_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM size WHERE size_id = ?', [size_id], (error, results) => {
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
    static findBySizeName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM size WHERE name = ?', [Name], (error, results) => {
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
    static createSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO size (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
            console.log(size);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [size.name, size.created_at, size.created_by, size.update_at, size.update_by, size.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdUserId = result.insertId;
                        const createdUser = Object.assign(Object.assign({}, size), { size_id: createdUserId });
                        resolve(createdUser);
                    }
                });
            });
        });
    }
    static updateSize(rol_id, rolData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE size SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE size_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [rolData.name, rolData.update_at, rolData.update_by, rolData.deleted, rol_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, rolData), { size_id: rol_id });
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
    static deleteSize(size_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM size WHERE size_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [size_id], (error, result) => {
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
exports.SizeRepository = SizeRepository;
