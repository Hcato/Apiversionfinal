import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

// Importar rutas de módulos
import userRoutes from './users/routes/UserRoutes';
import rolsRoutes from './rols/routes/RolRoutes';
import ProductRoutes from './product/routes/ProductRoutes';
import orderRoutes from './order/routes/OrderRoutes';
import CategoryRoutes from './category/routes/categoryRoutes';
import colorRoutes from './Color/routes/colorRoutes';
import sizeRoutes from './size/routes/sizeRoutes';
import OpRoutes from './Order-Product/routes/OpRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000; // Valor predeterminado en caso de que PORT no esté definido

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
 
// Rutas de los módulos
app.use('/api/user', userRoutes);
app.use('/api/rol', rolsRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/color', colorRoutes);
app.use('/api/size', sizeRoutes);
app.use('/api/op', OpRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Configuración del servidor HTTPS

app.listen(port, () => {
  console.log(`Servidor corriendo en https://localhost:${port}`);
});
