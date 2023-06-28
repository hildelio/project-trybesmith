import { Router } from 'express';
import loginController from '../database/controller/loginController';
import loginValidation from '../database/middlewares/loginValidation';

const loginRouter = Router();

loginRouter.post('/', loginValidation, loginController.login);

export default loginRouter;