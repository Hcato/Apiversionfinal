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
exports.deleteOp = exports.updateOp = exports.createOp = exports.getOpById = exports.getOp = void 0;
const OpService_1 = require("../Service/OpService");
const getOp = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rols = yield OpService_1.OpService.getAllOp();
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
exports.getOp = getOp;
const getOpById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield OpService_1.OpService.getRolById(parseInt(req.params.rol_id, 10));
        if (rol) {
            res.status(201).json(rol);
        }
        else {
            res.status(404).json({ message: 'No se encontró el order_product' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOpById = getOpById;
const createOp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRol = yield OpService_1.OpService.addOp(req.body);
        if (newRol) {
            res.status(201).json(newRol);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOp = createOp;
const updateOp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRol = yield OpService_1.OpService.modifyOp(parseInt(req.params.rol_id, 10), req.body);
        if (updatedRol) {
            res.status(201).json(updatedRol);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOp = updateOp;
const deleteOp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield OpService_1.OpService.deleteOp(parseInt(req.params.rol_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el order_product.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteOp = deleteOp;
