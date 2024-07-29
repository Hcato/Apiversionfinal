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
exports.RolRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class RolRepository {
    static findAllRol() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT rol_id, name, description FROM role', (error, results) => {
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
    static findByRolId(rol_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM role WHERE rol_id = ?', [rol_id], (error, results) => {
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
    static findByRoleName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM role WHERE name = ?', [Name], (error, results) => {
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
    static createRol(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO role (name, description, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?)';
            console.log(rol);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [rol.name, rol.description, rol.created_at, rol.created_by, rol.update_at, rol.update_by, rol.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdUserId = result.insertId;
                        const createdUser = Object.assign(Object.assign({}, rol), { rol_id: createdUserId });
                        resolve(createdUser);
                    }
                });
            });
        });
    }
    static updateRol(rol_id, rolData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE role SET name = ?, description=?, update_at = ?, update_by = ?, deleted = ? WHERE rol_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [rolData.name, rolData.description, rolData.update_at, rolData.update_by, rolData.deleted, rol_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedEmployee = Object.assign(Object.assign({}, rolData), { rol_id: rol_id });
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
    static deleteRol(rol_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM role WHERE rol_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [rol_id], (error, result) => {
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
exports.RolRepository = RolRepository;
