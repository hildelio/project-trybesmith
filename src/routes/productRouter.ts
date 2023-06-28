import { Router } from 'express';
import productController from '../database/controller/productController';
import productValidation from '../database/middlewares/productValidation';

const productRouter = Router();

productRouter.post('/', productValidation, productController.create);

productRouter.get('/', productController.getAll);

export default productRouter;