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
exports.deleteSize = exports.updateSize = exports.createSize = exports.getSizeById = exports.getSizes = void 0;
const sizeService_1 = require("../service/sizeService");
const getSizes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield sizeService_1.sizeService.getAllSize();
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
exports.getSizes = getSizes;
const getSizeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield sizeService_1.sizeService.getSizeById(parseInt(req.params.size_id, 10));
        if (user) {
            res.status(201).json(user);
        }
        else {
            res.status(404).json({ message: 'No se encontró el size' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getSizeById = getSizeById;
const createSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield sizeService_1.sizeService.addSize(req.body);
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
exports.createSize = createSize;
const updateSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield sizeService_1.sizeService.modifySize(parseInt(req.params.size_id, 10), req.body);
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
exports.updateSize = updateSize;
const deleteSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield sizeService_1.sizeService.deleteSize(parseInt(req.params.size_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el size' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteSize = deleteSize;
