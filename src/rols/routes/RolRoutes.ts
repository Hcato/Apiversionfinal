import { Router } from 'express';
import { getRolById, getRols, createRol, updateRol, deleteRol } from '../controllers/RolController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rolsRoutes: Router = Router();

rolsRoutes.get('/', authMiddleware, getRols);
rolsRoutes.get('/:rol_id', authMiddleware,getRolById);
rolsRoutes.post('/', authMiddleware, createRol);
rolsRoutes.put('/:rol_id', authMiddleware, updateRol);
rolsRoutes.delete('/:rol_id',authMiddleware, deleteRol);

export default rolsRoutes;