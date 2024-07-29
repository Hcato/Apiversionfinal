import { Request, Response } from 'express';
import { CategoryService } from '../service/CategoryService';

export const getCategories= async (_req: Request, res: Response) => {
  try {
    const users = await CategoryService.getAllCategories();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin categorias' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const user = await CategoryService.getCategoryById(parseInt(req.params.category_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró la categoria' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newUser = await CategoryService.addCategory(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedUser = await CategoryService.modifyCategory(parseInt(req.params.category_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await CategoryService.deleteCategory(parseInt(req.params.category_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la categoria.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};