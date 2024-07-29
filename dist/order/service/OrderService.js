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
exports.orderService = void 0;
const OrderRepository_1 = require("../Repositories/OrderRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class orderService {
    static getAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findAllOrder();
            }
            catch (error) {
                throw new Error(`Error al obtener la orden: ${error.message}`);
            }
        });
    }
    static getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findByOrderId(orderId);
            }
            catch (error) {
                throw new Error(`Error al encontrar la orden: ${error.message}`);
            }
        });
    }
    static getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findByUserId(userId);
            }
            catch (error) {
                throw new Error(`Error al encontrar las órdenes: ${error.message}`);
            }
        });
    }
    static getOrdersByUserIdWithProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findByUserIdWithProducts(userId);
            }
            catch (error) {
                throw new Error(`Error al encontrar las órdenes y productos: ${error.message}`);
            }
        });
    }
    static addOrder(order, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                order.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                order.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield OrderRepository_1.OrderRepository.createOrder(order, products);
            }
            catch (error) {
                throw new Error(`Error al crear la orden: ${error.message}`);
            }
        });
    }
    static modifyOrder(orderId, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderFinded = yield OrderRepository_1.OrderRepository.findByOrderId(orderId);
                if (orderFinded) {
                    if (orderData.status) {
                        orderFinded.status = orderData.status;
                    }
                    if (orderData.user_id) {
                        orderFinded.user_id = orderData.user_id;
                    }
                    if (orderData.total) {
                        orderFinded.total = orderFinded.total;
                    }
                    if (orderData.deleted) {
                        orderFinded.deleted = orderData.deleted;
                    }
                }
                else {
                    return null;
                }
                orderFinded.update_by = orderData.update_by;
                orderFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield OrderRepository_1.OrderRepository.updateOrder(orderId, orderFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar la orden: ${error.message}`);
            }
        });
    }
    static modifyToSell(orderId, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderFinded = yield OrderRepository_1.OrderRepository.findByOrderId(orderId);
                if (orderFinded) {
                    if (orderData.status) {
                        orderFinded.status = orderData.status;
                    }
                    if (orderData.address) {
                        orderFinded.address = orderData.address;
                    }
                }
                else {
                    return null;
                }
                orderFinded.update_by = orderData.update_by;
                orderFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield OrderRepository_1.OrderRepository.updateSell(orderId, orderFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar la orden: ${error.message}`);
            }
        });
    }
    static deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.deleteOrder(orderId);
            }
            catch (error) {
                throw new Error(`Error al eliminar la orden: ${error.message}`);
            }
        });
    }
}
exports.orderService = orderService;
