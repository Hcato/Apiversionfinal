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
exports.deleteColor = exports.updateColor = exports.createColor = exports.getColorByName = exports.getColorById = exports.getColors = void 0;
const colorService_1 = require("../Service/colorService");
const getColors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield colorService_1.ColorService.getAllColor();
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
exports.getColors = getColors;
const getColorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield colorService_1.ColorService.getColorById(parseInt(req.params.color_id, 10));
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
exports.getColorById = getColorById;
const getColorByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const color = yield colorService_1.ColorService.getColorByName(req.body);
        if (color) {
            res.status(201).json(color);
        }
        else {
            res.status(404).json({ message: 'No se encontró la orden' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getColorByName = getColorByName;
const createColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield colorService_1.ColorService.addColor(req.body);
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
exports.createColor = createColor;
const updateColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield colorService_1.ColorService.modifyColor(parseInt(req.params.color_id, 10), req.body);
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
exports.updateColor = updateColor;
const deleteColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield colorService_1.ColorService.deleteColor(parseInt(req.params.color_id, 10));
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
exports.deleteColor = deleteColor;
