import { Request, Response } from 'express';
import { ProductService } from '../service/ProductService';

export const getProducts= async (_req: Request, res: Response) => {
  try {
    const rols = await ProductService.getAllProduct();
    if(rols){
      res.status(201).json(rols);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const rol = await ProductService.getProductById(parseInt(req.params.product_id, 10));
    if(rol){
      res.status(201).json(rol);
    }else{
      res.status(404).json({ message: 'No se encontró el producto' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductBycategory = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getProductBycategory(parseInt(req.params.category_id_fk, 10));
    if(products && products.length > 0){
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No se encontraron productos para la categoría especificada' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createProduct = async (req: Request, res: Response) => { //crear productos con imagenes
  try {
    let imageUrl: string | undefined;
    
    if (req.body.imageUrl) {
      // Caso de imagen externa
      imageUrl = req.body.imageUrl;
    } else if (req.file) {
      // Caso de imagen cargada
      const urlProject = process.env.URL;
      const portProject = process.env.PORT;
      imageUrl = `${urlProject}:${portProject}/uploads/${req.file.filename}`;
    } else {
      return res.status(400).send('No image provided.');
    }
    
    const productData = { ...req.body, url: imageUrl, created_at: new Date(), update_at: new Date() };
    const newProduct = await ProductService.addProduct(productData);
    
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    let imageUrl: string | undefined;

    if (req.body.imageUrl) {
      // Caso de imagen externa
      imageUrl = req.body.imageUrl;
    } else if (req.file) {
      // Caso de imagen cargada
      const urlProject = process.env.URL;
      const portProject = process.env.PORT;
      imageUrl = `${urlProject}:${portProject}/uploads/${req.file.filename}`;
    }

    const productData = { ...req.body, url: imageUrl, update_at: new Date() };
    const updatedProduct = await ProductService.modifyProduct(parseInt(req.params.product_id, 10), productData);

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.deleteProduct(parseInt(req.params.product_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el producto.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};