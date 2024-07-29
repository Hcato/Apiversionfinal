import { Request, Response } from 'express';
import { rolService } from '../service/RolService';

export const getRols= async (_req: Request, res: Response) => {
  try {
    const rols = await rolService.getAllRol();
    if(rols){
      res.status(201).json(rols);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRolById = async (req: Request, res: Response) => {
  try {
    const rol = await rolService.getRolById(parseInt(req.params.rol_id, 10));
    if(rol){
      res.status(201).json(rol);
    }else{
      res.status(404).json({ message: 'No se encontró el rol' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const newRol = await rolService.addRol(req.body);
    if(newRol){
      res.status(201).json(newRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const updatedRol = await rolService.modifyRol(parseInt(req.params.rol_id, 10), req.body);
    if(updatedRol){
      res.status(201).json(updatedRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  try {
    const deleted = await rolService.deleteRol(parseInt(req.params.rol_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el rol.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};