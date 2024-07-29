"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error('Error:', err.stack);
    // Manejo del error y respuesta adecuada al cliente
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message // Mensaje específico del error que se envía al cliente
    });
}
