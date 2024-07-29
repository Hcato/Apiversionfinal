import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById, getProductBycategory } from '../controller/ProductController';
import { authMiddleware } from '../../shared/middlewares/auth';
import upload from '../../shared/middlewares/uploadMiddleware';

const ProductRoutes: Router = Router();

ProductRoutes.get('/', getProducts);
ProductRoutes.get('/:product_id', getProductById);
ProductRoutes.get('/category/:category_id_fk', getProductBycategory)
ProductRoutes.post('/', upload.single('image'),authMiddleware, createProduct);
ProductRoutes.put('/:product_id', upload.single('image'), authMiddleware, updateProduct);
ProductRoutes.delete('/:product_id', deleteProduct);

export default ProductRoutes;