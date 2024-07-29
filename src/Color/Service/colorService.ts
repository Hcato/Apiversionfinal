import { ColorRepository } from "../repositories/ColorRepository";
import { Color } from "../Model/Colormodel";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class ColorService {

    public static async getAllColor(): Promise<Color[]> {
        try{
            return await ColorRepository.findAllColors();
        }catch (error: any){
            throw new Error(`Error al obtener la orden: ${error.message}`);
        }
    }

    public static async getColorById(colorId: number): Promise<Color | null> {
        try{
            return await ColorRepository.findByColorId(colorId);
        }catch (error: any){
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }
    
    public static async getColorByName(name : string): Promise<Color | null>{
        try {
            return await ColorRepository.findByColorName(name);
        } catch (error: any) {
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    public static async addColor(order: Color) {
        try {
            order.created_at = DateUtils.formatDate(new Date());
            order.update_at = DateUtils.formatDate(new Date());
            return await ColorRepository.createColor(order);
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    public static async modifyColor(colorId: number, colorData: Color){
        try{
            const colorFinded =  await ColorRepository.findByColorId(colorId);

            if(colorFinded){
                if(colorData.name){
                    colorFinded.name = colorData.name;
                }
                if(colorData.deleted){
                    colorFinded.deleted = colorData.deleted;
                }
            }else{
                return null;
            }
            colorFinded.update_by = colorData.update_by
            colorFinded.update_at = DateUtils.formatDate(new Date());
            return await ColorRepository.updateColor(colorId,colorFinded);
        }catch (error: any){
            throw new Error(`Error al modificar la orden: ${error.message}`);
        }
    }

    public static async deleteColor(colorId: number): Promise<boolean> {
        try{
            return await ColorRepository.deleteColor(colorId);
        }catch (error: any){
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }

}