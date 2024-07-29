import { CategoryRepository } from "../Repositories/categoryRepository";
import { Category } from "../models/categoryModel";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class CategoryService {

    public static async getAllCategories(): Promise<Category[]> {
        try{
            return await CategoryRepository.findAllCategories();
        }catch (error: any){
            throw new Error(`Error al obtener la categoria: ${error.message}`);
        }
    }

    public static async getCategoryById(categoryId: number): Promise<Category | null> {
        try{
            return await CategoryRepository.findByCategoryrId(categoryId);
        }catch (error: any){
            throw new Error(`Error al encontrar la categoria: ${error.message}`);
        }
    }

    public static async getCategoryByName(name: string): Promise<Category | null> {
        try{
            return await CategoryRepository.findByCategoryName(name);
        }catch (error: any){
            throw new Error(`Error al encontrar la categoria: ${error.message}`);
        }
    }

    public static async addCategory(category: Category) {
        try {
            category.created_at = DateUtils.formatDate(new Date());
            category.update_at = DateUtils.formatDate(new Date());
            return await CategoryRepository.createCategory(category);
        } catch (error: any) {
            throw new Error(`Error al crear la categoria: ${error.message}`);
        }
    }

    public static async modifyCategory(categoryId: number, categoryData: Category){
        try{
            const categoryFinded =  await CategoryRepository.findByCategoryrId(categoryId);

            if(categoryFinded){
                if(categoryData.name){
                    categoryFinded.name = categoryData.name;
                }
                if(categoryData.deleted){
                    categoryFinded.deleted = categoryData.deleted;
                }
            }else{
                return null;
            }
            categoryFinded.update_by = categoryData.update_by
            categoryFinded.update_at = DateUtils.formatDate(new Date());
            return await CategoryRepository.updateUser(categoryId,categoryFinded);
        }catch (error: any){
            throw new Error(`Error al modificar la categoria: ${error.message}`);
        }
    }

    public static async deleteCategory(categoryId: number): Promise<boolean> {
        try{
            return await CategoryRepository.deleteCategory(categoryId);
        }catch (error: any){
            throw new Error(`Error al eliminar la categoria: ${error.message}`);
        }
    }

}