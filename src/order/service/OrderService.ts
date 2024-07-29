import { OrderRepository } from "../Repositories/OrderRepository";
import { Order } from "../models/Ordermodel";
import { OrderWithProducts } from "../models/OrderWithProducts";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class orderService {

    public static async getAllOrder(): Promise<Order[]> {
        try{
            return await OrderRepository.findAllOrder();
        }catch (error: any){
            throw new Error(`Error al obtener la orden: ${error.message}`);
        }
    }

    public static async getOrderById(orderId: number): Promise<Order | null> {
        try{
            return await OrderRepository.findByOrderId(orderId);
        }catch (error: any){
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    public static async getOrdersByUserId(userId: number): Promise<Order[]> {
        try {
          return await OrderRepository.findByUserId(userId);
        } catch (error: any) {
          throw new Error(`Error al encontrar las órdenes: ${error.message}`);
        }
      }

      public static async getOrdersByUserIdWithProducts(userId: number): Promise<OrderWithProducts[]> {
        try {
          return await OrderRepository.findByUserIdWithProducts(userId);
        } catch (error: any) {
          throw new Error(`Error al encontrar las órdenes y productos: ${error.message}`);
        }
      }  

    public static async addOrder(order: Order, products: { product_id: number, amount: number }[]) {
        try {
          order.created_at = DateUtils.formatDate(new Date());
          order.update_at = DateUtils.formatDate(new Date());
          return await OrderRepository.createOrder(order, products);
        } catch (error: any) {
          throw new Error(`Error al crear la orden: ${error.message}`);
        }
      }

    public static async modifyOrder(orderId: number, orderData: Order){
        try{
            const orderFinded =  await OrderRepository.findByOrderId(orderId);

            if(orderFinded){
                if(orderData.status){
                    orderFinded.status = orderData.status;
                }
                if(orderData.user_id){
                    orderFinded.user_id = orderData.user_id;
                }
                if (orderData.total) {
                    orderFinded.total = orderFinded.total;
                }
                if(orderData.deleted){
                    orderFinded.deleted = orderData.deleted;
                }
            }else{
                return null;
            }
            orderFinded.update_by = orderData.update_by
            orderFinded.update_at = DateUtils.formatDate(new Date());
            return await OrderRepository.updateOrder(orderId,orderFinded);
        }catch (error: any){
            throw new Error(`Error al modificar la orden: ${error.message}`);
        }
    }

    public static async modifyToSell(orderId: number, orderData: Order){
        try{
            const orderFinded =  await OrderRepository.findByOrderId(orderId);

            if(orderFinded){
                if(orderData.status){
                    orderFinded.status = orderData.status;
                }
                if (orderData.address) {
                    orderFinded.address = orderData.address;
                }
            }else{
                return null;
            }
            orderFinded.update_by = orderData.update_by
            orderFinded.update_at = DateUtils.formatDate(new Date());
            return await OrderRepository.updateSell(orderId,orderFinded);
        }catch (error: any){
            throw new Error(`Error al modificar la orden: ${error.message}`);
        }
    }

    public static async deleteOrder(orderId: number): Promise<boolean> {
        try{
            return await OrderRepository.deleteOrder(orderId);
        }catch (error: any){
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }

}