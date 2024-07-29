import { RolRepository } from "../repositories/RolRepository";
import { Rol } from "../models/RolModel";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";


const saltRounds = 10;

export class rolService {

    public static async getAllRol(): Promise<Rol[]> {
        try{
            return await RolRepository.findAllRol();
        }catch (error: any){
            throw new Error(`Error al obtener el rol: ${error.message}`);
        }
    }

    public static async getRolById(rolId: number): Promise<Rol | null> {
        try{
            return await RolRepository.findByRolId(rolId);
        }catch (error: any){
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }

    public static async getRolByName(name: string): Promise<Rol | null> {
        try{
            return await RolRepository.findByRoleName(name);
        }catch (error: any){
            throw new Error(`Error al encontrar el rol: ${error.message}`);
        }
    }

    public static async addRol(rol: Rol) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            rol.created_at = DateUtils.formatDate(new Date());
            rol.update_at = DateUtils.formatDate(new Date());
            return await RolRepository.createRol(rol);
        } catch (error: any) {
            throw new Error(`Error al crear el rol: ${error.message}`);
        }
    }

    public static async modifyRol(rolId: number, rolData: Rol){
        try{
            const rolFinded =  await RolRepository.findByRolId(rolId);

            if(rolFinded){
                if(rolData.name){
                    rolFinded.name = rolData.name;
                }
                if(rolData.description){
                    rolFinded.description= rolData.description;
                }
                if(rolData.deleted){
                    rolFinded.deleted = rolData.deleted;
                }
            }else{
                return null;
            }
            rolFinded.update_by = rolData.update_by
            rolFinded.update_at = DateUtils.formatDate(new Date());
            return await RolRepository.updateRol(rolId,rolFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el rol: ${error.message}`);
        }
    }

    public static async deleteRol(rolId: number): Promise<boolean> {
        try{
            return await RolRepository.deleteRol(rolId);
        }catch (error: any){
            throw new Error(`Error al eliminar el rol: ${error.message}`);
        }
    }

}