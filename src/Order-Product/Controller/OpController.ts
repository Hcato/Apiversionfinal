import { Request, Response } from 'express';
import { OpService } from '../Service/OpService';

export const getOp= async (_req: Request, res: Response) => {
  try {
    const rols = await OpService.getAllOp();
    if(rols){
      res.status(201).json(rols);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOpById = async (req: Request, res: Response) => {
  try {
    const rol = await OpService.getRolById(parseInt(req.params.rol_id, 10));
    if(rol){
      res.status(201).json(rol);
    }else{
      res.status(404).json({ message: 'No se encontró el order_product' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOp = async (req: Request, res: Response) => {
  try {
    const newRol = await OpService.addOp(req.body);
    if(newRol){
      res.status(201).json(newRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOp = async (req: Request, res: Response) => {
  try {
    const updatedRol = await OpService.modifyOp(parseInt(req.params.rol_id, 10), req.body);
    if(updatedRol){
      res.status(201).json(updatedRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOp = async (req: Request, res: Response) => {
  try {
    const deleted = await OpService.deleteOp(parseInt(req.params.rol_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el order_product.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};