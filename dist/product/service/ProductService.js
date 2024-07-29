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
exports.ProductService = void 0;
const ProductRepo_1 = require("../repositories/ProductRepo");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ProductService {
    static getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepo_1.ProductRepository.findAllProduct();
            }
            catch (error) {
                throw new Error(`Error al obtener el producto: ${error.message}`);
            }
        });
    }
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepo_1.ProductRepository.findByProductId(productId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el producto: ${error.message}`);
            }
        });
    }
    static getProductBycategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepo_1.ProductRepository.findProductsByCategory(categoryId);
            }
            catch (error) {
                throw new Error(`Error al encontrar los productos: ${error.message}`);
            }
        });
    }
    static getProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepo_1.ProductRepository.findByProductName(name);
            }
            catch (error) {
                throw new Error(`Error al encontrar el producto: ${error.message}`);
            }
        });
    }
    static addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                productData.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                productData.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield ProductRepo_1.ProductRepository.createProduct(productData);
            }
            catch (error) {
                throw new Error(`Error al crear el producto: ${error.message}`);
            }
        });
    }
    static modifyProduct(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productFinded = yield ProductRepo_1.ProductRepository.findByProductId(productId);
                if (productFinded) {
                    if (productData.category_id_fk) {
                        productFinded.category_id_fk = productData.category_id_fk;
                    }
                    if (productData.color_id_fk) {
                        productFinded.color_id_fk = productData.color_id_fk;
                    }
                    if (productData.size_id_fk) {
                        productFinded.size_id_fk = productData.size_id_fk;
                    }
                    if (productData.name) {
                        productFinded.name = productData.name;
                    }
                    if (productData.description) {
                        productFinded.description = productData.description;
                    }
                    if (productData.price) {
                        productFinded.price = productData.price;
                    }
                    if (productData.total_amount) {
                        productFinded.total_amount = productData.total_amount;
                    }
                    if (productData.url) {
                        productFinded.url = productData.url;
                    }
                    productFinded.update_by = productData.update_by;
                    productFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield ProductRepo_1.ProductRepository.updateProduct(productId, productFinded);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar el producto: ${error.message}`);
            }
        });
    }
    static deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepo_1.ProductRepository.deleteProduct(productId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el producto: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
