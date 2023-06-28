import { Router } from 'express';
import orderController from '../database/controller/orderController';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);

export default orderRouter;
