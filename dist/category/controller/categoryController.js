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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const CategoryService_1 = require("../service/CategoryService");
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield CategoryService_1.CategoryService.getAllCategories();
        if (users) {
            res.status(201).json(users);
        }
        else {
            res.status(404).json({ message: 'Sin categorias' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield CategoryService_1.CategoryService.getCategoryById(parseInt(req.params.category_id, 10));
        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(404).json({ message: 'No se encontró la categoria' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield CategoryService_1.CategoryService.addCategory(req.body);
        if (newUser) {
            res.status(201).json(newUser);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield CategoryService_1.CategoryService.modifyCategory(parseInt(req.params.category_id, 10), req.body);
        if (updatedUser) {
            res.status(201).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield CategoryService_1.CategoryService.deleteCategory(parseInt(req.params.category_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó la categoria.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
