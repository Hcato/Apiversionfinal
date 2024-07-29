import { Router } from 'express';
import { getColors, getColorById, getColorByName ,createColor, updateColor, deleteColor } from '../controller/colorController';
import { authMiddleware } from '../../shared/middlewares/auth';

const colorRoutes: Router = Router();

colorRoutes.get('/', authMiddleware, getColors);
colorRoutes.get('/:color_id', authMiddleware,getColorById);
colorRoutes.post('/', authMiddleware, createColor);
colorRoutes.put('/:color_id', authMiddleware, updateColor);
colorRoutes.delete('/:color_id',authMiddleware, deleteColor);

export default colorRoutes;