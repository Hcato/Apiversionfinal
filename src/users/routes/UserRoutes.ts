import { Router } from 'express';
import { loginUser, createUser, updateUser, getUserById, deleteUser, getUsers, getUserByName } from '../controllers/UserController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', getUsers);
userRoutes.get('/:user_id', getUserById);
userRoutes.get('/name/:first_name', getUserByName);
userRoutes.post('/', createUser);
userRoutes.put('/:user_id', authMiddleware, updateUser);
userRoutes.delete('/:user_id', deleteUser);

export default userRoutes;