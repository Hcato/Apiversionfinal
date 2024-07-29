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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByName = exports.getUserById = exports.getUsers = exports.loginUser = void 0;
const userService_1 = require("../services/userService");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, password } = req.body;
    try {
        const token = yield userService_1.userService.login(first_name, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid full name or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.userService.getAllUser();
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
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService_1.userService.getUserById(parseInt(req.params.user_id, 10));
        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_name = req.params.first_name;
        const user = yield userService_1.userService.getUserByName(first_name);
        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserByName = getUserByName;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userService_1.userService.addUser(req.body);
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
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService_1.userService.modifyUserr(parseInt(req.params.user_id, 10), req.body);
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
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield userService_1.userService.deleteEmployee(parseInt(req.params.user_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el usuario.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
