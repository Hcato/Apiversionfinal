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
exports.OpService = void 0;
const OPRepository_1 = require("../Repository/OPRepository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class OpService {
    static getAllOp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OPRepository_1.OPRepository.findAllOP();
            }
            catch (error) {
                throw new Error(`Error al obtener el order_product: ${error.message}`);
            }
        });
    }
    static getRolById(opId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OPRepository_1.OPRepository.findByROPId(opId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el order_product: ${error.message}`);
            }
        });
    }
    static addOp(rol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OPRepository_1.OPRepository.createOP(rol);
            }
            catch (error) {
                throw new Error(`Error al crear el order_product: ${error.message}`);
            }
        });
    }
    static modifyOp(opId, opData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const OpFinded = yield OPRepository_1.OPRepository.findByROPId(opId);
                if (OpFinded) {
                    if (opData.order_id_fk) {
                        OpFinded.order_id_fk = opData.order_id_fk;
                    }
                    if (opData.product_id_fk) {
                        OpFinded.product_id_fk = opData.product_id_fk;
                    }
                    if (opData.amount) {
                        OpFinded.amount = opData.amount;
                    }
                }
                else {
                    return null;
                }
                return yield OPRepository_1.OPRepository.updateOP(opId, OpFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar el order_product: ${error.message}`);
            }
        });
    }
    static deleteOp(opId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OPRepository_1.OPRepository.deleteOP(opId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el order_product: ${error.message}`);
            }
        });
    }
}
exports.OpService = OpService;
