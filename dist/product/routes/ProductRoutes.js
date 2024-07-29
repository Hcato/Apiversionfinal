"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controller/ProductController");
const auth_1 = require("../../shared/middlewares/auth");
const uploadMiddleware_1 = __importDefault(require("../../shared/middlewares/uploadMiddleware"));
const ProductRoutes = (0, express_1.Router)();
ProductRoutes.get('/', ProductController_1.getProducts);
ProductRoutes.get('/:product_id', ProductController_1.getProductById);
ProductRoutes.get('/category/:category_id_fk', ProductController_1.getProductBycategory);
ProductRoutes.post('/', uploadMiddleware_1.default.single('image'), auth_1.authMiddleware, ProductController_1.createProduct);
ProductRoutes.put('/:product_id', uploadMiddleware_1.default.single('image'), auth_1.authMiddleware, ProductController_1.updateProduct);
ProductRoutes.delete('/:product_id', ProductController_1.deleteProduct);
exports.default = ProductRoutes;
