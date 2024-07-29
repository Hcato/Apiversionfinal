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
exports.sizeService = void 0;
const sizeRepository_1 = require("../repository/sizeRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class sizeService {
    static getAllSize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.findAllSize();
            }
            catch (error) {
                throw new Error(`Error al obtener el size: ${error.message}`);
            }
        });
    }
    static getSizeById(sizeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.findBySizeId(sizeId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el size: ${error.message}`);
            }
        });
    }
    static getSizeByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.findBySizeName(name);
            }
            catch (error) {
                throw new Error(`Error al encontrar el size: ${error.message}`);
            }
        });
    }
    static addSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                size.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                size.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield sizeRepository_1.SizeRepository.createSize(size);
            }
            catch (error) {
                throw new Error(`Error al crear el size: ${error.message}`);
            }
        });
    }
    static modifySize(sizeId, sizeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizeFinded = yield sizeRepository_1.SizeRepository.findBySizeId(sizeId);
                if (sizeFinded) {
                    if (sizeData.name) {
                        sizeFinded.name = sizeData.name;
                    }
                    if (sizeData.deleted) {
                        sizeFinded.deleted = sizeData.deleted;
                    }
                }
                else {
                    return null;
                }
                sizeFinded.update_by = sizeData.update_by;
                sizeFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield sizeRepository_1.SizeRepository.updateSize(sizeId, sizeFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar el size: ${error.message}`);
            }
        });
    }
    static deleteSize(sizeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield sizeRepository_1.SizeRepository.deleteSize(sizeId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el size: ${error.message}`);
            }
        });
    }
}
exports.sizeService = sizeService;
