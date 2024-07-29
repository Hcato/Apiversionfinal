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
exports.ColorService = void 0;
const ColorRepository_1 = require("../repositories/ColorRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ColorService {
    static getAllColor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ColorRepository_1.ColorRepository.findAllColors();
            }
            catch (error) {
                throw new Error(`Error al obtener la orden: ${error.message}`);
            }
        });
    }
    static getColorById(colorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ColorRepository_1.ColorRepository.findByColorId(colorId);
            }
            catch (error) {
                throw new Error(`Error al encontrar la orden: ${error.message}`);
            }
        });
    }
    static getColorByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ColorRepository_1.ColorRepository.findByColorName(name);
            }
            catch (error) {
                throw new Error(`Error al encontrar la orden: ${error.message}`);
            }
        });
    }
    static addColor(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                order.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                order.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield ColorRepository_1.ColorRepository.createColor(order);
            }
            catch (error) {
                throw new Error(`Error al crear la orden: ${error.message}`);
            }
        });
    }
    static modifyColor(colorId, colorData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const colorFinded = yield ColorRepository_1.ColorRepository.findByColorId(colorId);
                if (colorFinded) {
                    if (colorData.name) {
                        colorFinded.name = colorData.name;
                    }
                    if (colorData.deleted) {
                        colorFinded.deleted = colorData.deleted;
                    }
                }
                else {
                    return null;
                }
                colorFinded.update_by = colorData.update_by;
                colorFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield ColorRepository_1.ColorRepository.updateColor(colorId, colorFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar la orden: ${error.message}`);
            }
        });
    }
    static deleteColor(colorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ColorRepository_1.ColorRepository.deleteColor(colorId);
            }
            catch (error) {
                throw new Error(`Error al eliminar la orden: ${error.message}`);
            }
        });
    }
}
exports.ColorService = ColorService;
