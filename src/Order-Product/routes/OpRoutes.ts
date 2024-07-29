import { Router } from 'express';
import { getOp, getOpById, createOp, updateOp, deleteOp } from '../Controller/OpController';
import { authMiddleware } from '../../shared/middlewares/auth';

const OpRoutes: Router = Router();

OpRoutes.get('/', authMiddleware, getOp);
OpRoutes.get('/:rol_id', authMiddleware,getOpById);
OpRoutes.post('/', authMiddleware, createOp);
OpRoutes.put('/:rol_id', authMiddleware, updateOp);
OpRoutes.delete('/:rol_id',authMiddleware, deleteOp);

export default OpRoutes;