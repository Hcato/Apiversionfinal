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
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRolById = exports.getRols = void 0;
const RolService_1 = require("../service/RolService");
const getRols = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rols = yield RolService_1.rolService.getAllRol();
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
exports.getRols = getRols;
const getRolById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield RolService_1.rolService.getRolById(parseInt(req.params.rol_id, 10));
        if (rol) {
            res.status(201).json(rol);
        }
        else {
            res.status(404).json({ message: 'No se encontró el rol' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRolById = getRolById;
const createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRol = yield RolService_1.rolService.addRol(req.body);
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
exports.createRol = createRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRol = yield RolService_1.rolService.modifyRol(parseInt(req.params.rol_id, 10), req.body);
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
exports.updateRol = updateRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield RolService_1.rolService.deleteRol(parseInt(req.params.rol_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el rol.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteRol = deleteRol;
