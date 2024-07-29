import { Router } from 'express';
import { createOrder, updateOrder, deleteOrder, getOrders, getOrderById, getOrdersByUserId, getOrdersByUserIdWithProducts, updatesSell } from '../controller/OrderController';
import { authMiddleware } from '../../shared/middlewares/auth';

const orderRoutes: Router = Router();

orderRoutes.get('/', authMiddleware, getOrders);
orderRoutes.get('/:order_id', authMiddleware,getOrderById);
orderRoutes.get('/user/:user_id', getOrdersByUserId);
orderRoutes.get('/user/products/:user_id', getOrdersByUserIdWithProducts);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:order_id', authMiddleware, updateOrder);
orderRoutes.put('/sell/:order_id', updatesSell);
orderRoutes.delete('/:order_id', deleteOrder);

export default orderRoutes;