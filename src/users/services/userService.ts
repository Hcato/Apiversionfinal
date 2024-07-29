import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";


const saltRounds = 10;

export class userService {

    public static async login(name: string, password: string){
        try{
            const user = await this.getUserByName(name);
            if(!user){
                return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return null;
            }

            const payload = {
                user_id: user.user_id,
                rol_id: user.rol_id,
                firstname: user.first_name,
                lastname : user.last_name,
                email: user.email,
            }
            return await jwt.sign(payload, secretKey, { expiresIn: '500m' });

        }catch (error: any){
            throw new Error(`Error al logearse: ${error.message}`);
        }

    }

    public static async getAllUser(): Promise<User[]> {
        try{
            return await UserRepository.findAllUser();
        }catch (error: any){
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    public static async getUserById(userId: number): Promise<User | null> {
        try{
            return await UserRepository.findByUserId(userId);
        }catch (error: any){
            throw new Error(`Error al encontrar el usuario: ${error.message}`);
        }
    }

    public static async getUserByName(first_name: string): Promise<User | null> {
        try {
          return await UserRepository.findByUserName(first_name);
        } catch (error: any) {
          throw new Error(`Error al encontrar el usuario: ${error.message}`);
        }
      }

    public static async addUser(user: User) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            user.created_at = DateUtils.formatDate(new Date());
            user.update_at = DateUtils.formatDate(new Date());
            user.password = await bcrypt.hash(user.password, salt);
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    public static async modifyUserr(userId: number, userData: User){
        try{
            const userFinded =  await UserRepository.findByUserId(userId);
            const salt = await bcrypt.genSalt(saltRounds);

            if(userFinded){
                if(userData.rol_id){
                    userFinded.rol_id = userData.rol_id;
                }
                if(userData.first_name){
                    userFinded.first_name = userData.first_name;
                }
                if (userData.last_name) {
                    userFinded.last_name = userData.last_name;
                }
                if (userData.email) {
                    userFinded.email = userData.email;
                }
                if(userData.password){
                    userFinded.password = await bcrypt.hash(userData.password, salt);
                }
                if(userData.deleted){
                    userFinded.deleted = userData.deleted;
                }
            }else{
                return null;
            }
            userFinded.update_by = userData.update_by
            userFinded.update_at = DateUtils.formatDate(new Date());
            return await UserRepository.updateUser(userId,userFinded);
        }catch (error: any){
            throw new Error(`Error al modificar eel usuario: ${error.message}`);
        }
    }

    public static async deleteEmployee(userId: number): Promise<boolean> {
        try{
            return await UserRepository.deleteUser(userId);
        }catch (error: any){
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

}