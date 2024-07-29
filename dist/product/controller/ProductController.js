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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBycategory = exports.getProductById = exports.getProducts = void 0;
const ProductService_1 = require("../service/ProductService");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rols = yield ProductService_1.ProductService.getAllProduct();
        if (rols) {
            res.status(201).json(rols);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield ProductService_1.ProductService.getProductById(parseInt(req.params.product_id, 10));
        if (rol) {
            res.status(201).json(rol);
        }
        else {
            res.status(404).json({ message: 'No se encontró el producto' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductById = getProductById;
const getProductBycategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductService_1.ProductService.getProductBycategory(parseInt(req.params.category_id_fk, 10));
        if (products && products.length > 0) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json({ message: 'No se encontraron productos para la categoría especificada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductBycategory = getProductBycategory;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl;
        if (req.body.imageUrl) {
            // Caso de imagen externa
            imageUrl = req.body.imageUrl;
        }
        else if (req.file) {
            // Caso de imagen cargada
            const urlProject = process.env.URL;
            const portProject = process.env.PORT;
            imageUrl = `${urlProject}:${portProject}/uploads/${req.file.filename}`;
        }
        else {
            return res.status(400).send('No image provided.');
        }
        const productData = Object.assign(Object.assign({}, req.body), { url: imageUrl, created_at: new Date(), update_at: new Date() });
        const newProduct = yield ProductService_1.ProductService.addProduct(productData);
        if (newProduct) {
            res.status(201).json(newProduct);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageUrl;
        if (req.body.imageUrl) {
            // Caso de imagen externa
            imageUrl = req.body.imageUrl;
        }
        else if (req.file) {
            // Caso de imagen cargada
            const urlProject = process.env.URL;
            const portProject = process.env.PORT;
            imageUrl = `${urlProject}:${portProject}/uploads/${req.file.filename}`;
        }
        const productData = Object.assign(Object.assign({}, req.body), { url: imageUrl, update_at: new Date() });
        const updatedProduct = yield ProductService_1.ProductService.modifyProduct(parseInt(req.params.product_id, 10), productData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield ProductService_1.ProductService.deleteProduct(parseInt(req.params.product_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el producto.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
