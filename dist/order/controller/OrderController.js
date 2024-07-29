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
exports.deleteOrder = exports.updatesSell = exports.updateOrder = exports.createOrder = exports.getOrdersByUserIdWithProducts = exports.getOrdersByUserId = exports.getOrderById = exports.getOrders = void 0;
const OrderService_1 = require("../service/OrderService");
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield OrderService_1.orderService.getAllOrder();
        if (users) {
            res.status(201).json(users);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield OrderService_1.orderService.getOrderById(parseInt(req.params.order_id, 10));
        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(404).json({ message: 'No se encontró la orden' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderById = getOrderById;
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const orders = yield OrderService_1.orderService.getOrdersByUserId(userId);
        if (orders.length > 0) {
            res.status(200).json(orders);
        }
        else {
            res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
const getOrdersByUserIdWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const ordersWithProducts = yield OrderService_1.orderService.getOrdersByUserIdWithProducts(userId);
        if (ordersWithProducts.length > 0) {
            res.status(200).json(ordersWithProducts);
        }
        else {
            res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrdersByUserIdWithProducts = getOrdersByUserIdWithProducts;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body.order;
        const productsData = req.body.products;
        const newOrder = yield OrderService_1.orderService.addOrder(orderData, productsData);
        if (newOrder) {
            res.status(201).json(newOrder);
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield OrderService_1.orderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
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
exports.updateOrder = updateOrder;
const updatesSell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield OrderService_1.orderService.modifyToSell(parseInt(req.params.order_id, 10), req.body);
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
exports.updatesSell = updatesSell;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield OrderService_1.orderService.deleteOrder(parseInt(req.params.order_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó la orden' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteOrder = deleteOrder;
