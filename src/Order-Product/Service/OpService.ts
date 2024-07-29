import { OPRepository } from "../Repository/OPRepository";
import { OrderProduct } from "../Model/OpModel";
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";


const saltRounds = 10;

export class OpService {

    public static async getAllOp(): Promise<OPRepository[]> {
        try{
            return await OPRepository.findAllOP();
        }catch (error: any){
            throw new Error(`Error al obtener el order_product: ${error.message}`);
        }
    }

    public static async getRolById(opId: number): Promise<OrderProduct | null> {
        try{
            return await OPRepository.findByROPId(opId);
        }catch (error: any){
            throw new Error(`Error al encontrar el order_product: ${error.message}`);
        }
    }

    public static async addOp(rol: OrderProduct) {
        try {
            return await OPRepository.createOP(rol);
        } catch (error: any) {
            throw new Error(`Error al crear el order_product: ${error.message}`);
        }
    }

    public static async modifyOp(opId: number, opData: OrderProduct){
        try{
            const OpFinded =  await OPRepository.findByROPId(opId);

            if(OpFinded){
                if(opData.order_id_fk){
                    OpFinded.order_id_fk = opData.order_id_fk;
                }
                if(opData.product_id_fk){
                    OpFinded.product_id_fk = opData.product_id_fk;
                }
                if(opData.amount){
                    OpFinded.amount = opData.amount;
                }
            }else{
                return null;
            }
            return await OPRepository.updateOP(opId,OpFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el order_product: ${error.message}`);
        }
    }

    public static async deleteOp(opId: number): Promise<boolean> {
        try{
            return await OPRepository.deleteOP(opId);
        }catch (error: any){
            throw new Error(`Error al eliminar el order_product: ${error.message}`);
        }
    }

}