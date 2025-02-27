"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../../shared/middlewares/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/login', UserController_1.loginUser);
userRoutes.get('/', UserController_1.getUsers);
userRoutes.get('/:user_id', UserController_1.getUserById);
userRoutes.get('/name/:first_name', UserController_1.getUserByName);
userRoutes.post('/', UserController_1.createUser);
userRoutes.put('/:user_id', auth_1.authMiddleware, UserController_1.updateUser);
userRoutes.delete('/:user_id', UserController_1.deleteUser);
exports.default = userRoutes;
