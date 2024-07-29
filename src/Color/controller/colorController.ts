import { Request, Response } from 'express';
import { ColorService } from '../Service/colorService';

export const getColors= async (_req: Request, res: Response) => {
  try {
    const users = await ColorService.getAllColor();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getColorById = async (req: Request, res: Response) => {
  try {
    const user = await ColorService.getColorById(parseInt(req.params.color_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getColorByName = async (req: Request, res: Response) =>{
  try {
    const color = await ColorService.getColorByName(req.body);
    if(color){
      res.status(201).json(color);
    }else{
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const createColor = async (req: Request, res: Response) => {
  try {
    const newUser = await ColorService.addColor(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateColor = async (req: Request, res: Response) => {
  try {
    const updatedUser = await ColorService.modifyColor(parseInt(req.params.color_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteColor = async (req: Request, res: Response) => {
  try {
    const deleted = await ColorService.deleteColor(parseInt(req.params.color_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la orden' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};