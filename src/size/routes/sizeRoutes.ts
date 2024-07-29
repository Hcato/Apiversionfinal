import { Router } from 'express';
import { getSizes,getSizeById,createSize,deleteSize,updateSize } from '../controller/sizeController';
import { authMiddleware } from '../../shared/middlewares/auth';

const sizeRoutes: Router = Router();

sizeRoutes.get('/', authMiddleware, getSizes);
sizeRoutes.get('/:size_id', authMiddleware,getSizeById);
sizeRoutes.post('/', authMiddleware, createSize);
sizeRoutes.put('/:size_id', authMiddleware, updateSize);
sizeRoutes.delete('/:size_id',authMiddleware, deleteSize);

export default sizeRoutes;