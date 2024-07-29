import { SizeRepository } from "../repository/sizeRepository";
import { Size } from "../Model/sizeModel";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class sizeService {

    public static async getAllSize(): Promise<Size[]> {
        try{
            return await SizeRepository.findAllSize();
        }catch (error: any){
            throw new Error(`Error al obtener el size: ${error.message}`);
        }
    }

    public static async getSizeById(sizeId: number): Promise<Size | null> {
        try{
            return await SizeRepository.findBySizeId(sizeId);
        }catch (error: any){
            throw new Error(`Error al encontrar el size: ${error.message}`);
        }
    }

    public static async getSizeByName(name: string): Promise<Size | null> {
        try{
            return await SizeRepository.findBySizeName(name);
        }catch (error: any){
            throw new Error(`Error al encontrar el size: ${error.message}`);
        }
    }

    public static async addSize(size: Size) {
        try {
            size.created_at = DateUtils.formatDate(new Date());
            size.update_at = DateUtils.formatDate(new Date());
            return await SizeRepository.createSize(size);
        } catch (error: any) {
            throw new Error(`Error al crear el size: ${error.message}`);
        }
    }

    public static async modifySize(sizeId: number, sizeData: Size){
        try{
            const sizeFinded =  await SizeRepository.findBySizeId(sizeId);

            if(sizeFinded){
                if(sizeData.name){
                    sizeFinded.name = sizeData.name;
                }
                if(sizeData.deleted){
                    sizeFinded.deleted = sizeData.deleted;
                }
            }else{
                return null;
            }
            sizeFinded.update_by = sizeData.update_by
            sizeFinded.update_at = DateUtils.formatDate(new Date());
            return await SizeRepository.updateSize(sizeId,sizeFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el size: ${error.message}`);
        }
    }

    public static async deleteSize(sizeId: number): Promise<boolean> {
        try{
            return await SizeRepository.deleteSize(sizeId);
        }catch (error: any){
            throw new Error(`Error al eliminar el size: ${error.message}`);
        }
    }

}