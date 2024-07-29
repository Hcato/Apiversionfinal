import { Request, Response } from 'express';
import { orderService } from '../service/OrderService';
import { Order } from '../models/Ordermodel';

export const getOrders= async (_req: Request, res: Response) => {
  try {
    const users = await orderService.getAllOrder();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = await orderService.getOrderById(parseInt(req.params.order_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id, 10);
    const orders = await orderService.getOrdersByUserId(userId);
    
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersByUserIdWithProducts = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id, 10);
    const ordersWithProducts = await orderService.getOrdersByUserIdWithProducts(userId);
    
    if (ordersWithProducts.length > 0) {
      res.status(200).json(ordersWithProducts);
    } else {
      res.status(404).json({ message: 'No se encontraron órdenes para este usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Order = req.body.order;
    const productsData: { product_id: number, amount: number }[] = req.body.products;
    const newOrder = await orderService.addOrder(orderData, productsData);
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedUser = await orderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatesSell = async (req: Request, res: Response) => {
  try {
    const updatedUser = await orderService.modifyToSell(parseInt(req.params.order_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await orderService.deleteOrder(parseInt(req.params.order_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la orden' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};