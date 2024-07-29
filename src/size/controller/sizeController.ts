import { Request, Response } from 'express';
import { sizeService } from '../service/sizeService';

export const getSizes= async (_req: Request, res: Response) => {
  try {
    const users = await sizeService.getAllSize();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSizeById = async (req: Request, res: Response) => {
  try {
    const user = await sizeService.getSizeById(parseInt(req.params.size_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró el size' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSize = async (req: Request, res: Response) => {
  try {
    const newUser = await sizeService.addSize(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSize = async (req: Request, res: Response) => {
  try {
    const updatedUser = await sizeService.modifySize(parseInt(req.params.size_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSize = async (req: Request, res: Response) => {
  try {
    const deleted = await sizeService.deleteSize(parseInt(req.params.size_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el size' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};