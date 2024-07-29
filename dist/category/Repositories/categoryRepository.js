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
exports.CategoryRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class CategoryRepository {
    static findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT category_id, name FROM category', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const categories = results;
                        resolve(categories);
                    }
                });
            });
        });
    }
    static findByCategoryrId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM category WHERE category_id = ?', [category_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const categories = results;
                        if (categories.length > 0) {
                            resolve(categories[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByCategoryName(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM category WHERE name = ?', [Name], (error, results) => {
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
    static createCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO category (name, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
            console.log(category);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [category.name, category.created_at, category.created_by, category.update_at, category.update_by, category.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdCategoryId = result.insertId;
                        const createdCategory = Object.assign(Object.assign({}, category), { category_id: createdCategoryId });
                        resolve(createdCategory);
                    }
                });
            });
        });
    }
    static updateUser(category_id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE category SET name = ?, update_at = ?, update_by = ?, deleted = ? WHERE category_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [categoryData.name, categoryData.update_at, categoryData.update_by, categoryData.deleted, category_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedCategory = Object.assign(Object.assign({}, categoryData), { category_id: category_id });
                            resolve(updatedCategory);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteCategory(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM category WHERE category_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [category_id], (error, result) => {
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
exports.CategoryRepository = CategoryRepository;
