import { Router } from 'express';
import productController from '../database/controller/productController';

const productRouter = Router();

productRouter.post('/', productController.create);

export default productRouter;