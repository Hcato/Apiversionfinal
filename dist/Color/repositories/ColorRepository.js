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
exports.ColorRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class ColorRepository {
    static findAllColors() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT color_id, name FROM `color`', (error, results) => {
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
    static findByColorId(color_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `color` WHERE color_id = ?', [color_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const colors = results;
                        if (colors.length > 0) {
                            resolve(colors[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByColorName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `color` WHERE name = ?', [Name], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const colors = results;
                        if (colors.length > 0) {
                            resolve(colors[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createColor(color) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO `color` (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
            console.log(color);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [color.name, color.created_at, color.created_by, color.update_at, color.update_by, color.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createColorId = result.insertId;
                        const createdOrder = Object.assign(Object.assign({}, color), { Color_id: createColorId });
                        resolve(createdOrder);
                    }
                });
            });
        });
    }
    static updateColor(color_id, colorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE `color` SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE color_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [colorData.name, colorData.update_at, colorData.update_by, colorData.deleted, color_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedColor = Object.assign(Object.assign({}, colorData), { Color_id: color_id });
                            resolve(updatedColor);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteColor(color_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM `color` WHERE color_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [color_id], (error, result) => {
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
exports.ColorRepository = ColorRepository;
