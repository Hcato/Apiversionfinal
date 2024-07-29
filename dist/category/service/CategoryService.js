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
exports.CategoryService = void 0;
const categoryRepository_1 = require("../Repositories/categoryRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class CategoryService {
    static getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoryRepository_1.CategoryRepository.findAllCategories();
            }
            catch (error) {
                throw new Error(`Error al obtener la categoria: ${error.message}`);
            }
        });
    }
    static getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoryRepository_1.CategoryRepository.findByCategoryrId(categoryId);
            }
            catch (error) {
                throw new Error(`Error al encontrar la categoria: ${error.message}`);
            }
        });
    }
    static getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoryRepository_1.CategoryRepository.findByCategoryName(name);
            }
            catch (error) {
                throw new Error(`Error al encontrar la categoria: ${error.message}`);
            }
        });
    }
    static addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                category.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                category.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield categoryRepository_1.CategoryRepository.createCategory(category);
            }
            catch (error) {
                throw new Error(`Error al crear la categoria: ${error.message}`);
            }
        });
    }
    static modifyCategory(categoryId, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryFinded = yield categoryRepository_1.CategoryRepository.findByCategoryrId(categoryId);
                if (categoryFinded) {
                    if (categoryData.name) {
                        categoryFinded.name = categoryData.name;
                    }
                    if (categoryData.deleted) {
                        categoryFinded.deleted = categoryData.deleted;
                    }
                }
                else {
                    return null;
                }
                categoryFinded.update_by = categoryData.update_by;
                categoryFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield categoryRepository_1.CategoryRepository.updateUser(categoryId, categoryFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar la categoria: ${error.message}`);
            }
        });
    }
    static deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoryRepository_1.CategoryRepository.deleteCategory(categoryId);
            }
            catch (error) {
                throw new Error(`Error al eliminar la categoria: ${error.message}`);
            }
        });
    }
}
exports.CategoryService = CategoryService;
