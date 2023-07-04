import { Router } from 'express';
import orderController from '../database/controller/orderController';
import { hasToken, tokenValidation } from '../database/middlewares/tokenValidation';
import orderValidation from '../database/middlewares/orderValidation';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);

orderRouter.post('/', hasToken, tokenValidation, orderValidation, orderController.create);

export default orderRouter;
