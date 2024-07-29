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
exports.rolService = void 0;
const RolRepository_1 = require("../repositories/RolRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class rolService {
    static getAllRol() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RolRepository_1.RolRepository.findAllRol();
            }
            catch (error) {
                throw new Error(`Error al obtener el rol: ${error.message}`);
            }
        });
    }
    static getRolById(rolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RolRepository_1.RolRepository.findByRolId(rolId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el rol: ${error.message}`);
            }
        });
    }
    static getRolByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RolRepository_1.RolRepository.findByRoleName(name);
            }
            catch (error) {
                throw new Error(`Error al encontrar el rol: ${error.message}`);
            }
        });
    }
    static addRol(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                rol.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                rol.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield RolRepository_1.RolRepository.createRol(rol);
            }
            catch (error) {
                throw new Error(`Error al crear el rol: ${error.message}`);
            }
        });
    }
    static modifyRol(rolId, rolData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rolFinded = yield RolRepository_1.RolRepository.findByRolId(rolId);
                if (rolFinded) {
                    if (rolData.name) {
                        rolFinded.name = rolData.name;
                    }
                    if (rolData.description) {
                        rolFinded.description = rolData.description;
                    }
                    if (rolData.deleted) {
                        rolFinded.deleted = rolData.deleted;
                    }
                }
                else {
                    return null;
                }
                rolFinded.update_by = rolData.update_by;
                rolFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield RolRepository_1.RolRepository.updateRol(rolId, rolFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar el rol: ${error.message}`);
            }
        });
    }
    static deleteRol(rolId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RolRepository_1.RolRepository.deleteRol(rolId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el rol: ${error.message}`);
            }
        });
    }
}
exports.rolService = rolService;
