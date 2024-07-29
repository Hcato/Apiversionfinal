"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Configuración del almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        // Ruta donde se guardarán los archivos subidos
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        // Nombre del archivo guardado (se recomienda que sea único, por el Date.now().)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Crea la instancia de multer con la configuración de almacenamiento
const upload = (0, multer_1.default)({ storage });
// Exporta el middleware para su uso en las rutas
exports.default = upload;
