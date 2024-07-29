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
exports.userService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class userService {
    static login(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByName(name);
                if (!user) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    user_id: user.user_id,
                    rol_id: user.rol_id,
                    firstname: user.first_name,
                    lastname: user.last_name,
                    email: user.email,
                };
                return yield jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '500m' });
            }
            catch (error) {
                throw new Error(`Error al logearse: ${error.message}`);
            }
        });
    }
    static getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findAllUser();
            }
            catch (error) {
                throw new Error(`Error al obtener los usuarios: ${error.message}`);
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findByUserId(userId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el usuario: ${error.message}`);
            }
        });
    }
    static getUserByName(first_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findByUserName(first_name);
            }
            catch (error) {
                throw new Error(`Error al encontrar el usuario: ${error.message}`);
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                user.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.password = yield bcrypt_1.default.hash(user.password, salt);
                return yield UserRepository_1.UserRepository.createUser(user);
            }
            catch (error) {
                throw new Error(`Error al crear el usuario: ${error.message}`);
            }
        });
    }
    static modifyUserr(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFinded = yield UserRepository_1.UserRepository.findByUserId(userId);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                if (userFinded) {
                    if (userData.rol_id) {
                        userFinded.rol_id = userData.rol_id;
                    }
                    if (userData.first_name) {
                        userFinded.first_name = userData.first_name;
                    }
                    if (userData.last_name) {
                        userFinded.last_name = userData.last_name;
                    }
                    if (userData.email) {
                        userFinded.email = userData.email;
                    }
                    if (userData.password) {
                        userFinded.password = yield bcrypt_1.default.hash(userData.password, salt);
                    }
                    if (userData.deleted) {
                        userFinded.deleted = userData.deleted;
                    }
                }
                else {
                    return null;
                }
                userFinded.update_by = userData.update_by;
                userFinded.update_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield UserRepository_1.UserRepository.updateUser(userId, userFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar eel usuario: ${error.message}`);
            }
        });
    }
    static deleteEmployee(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.deleteUser(userId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el usuario: ${error.message}`);
            }
        });
    }
}
exports.userService = userService;
