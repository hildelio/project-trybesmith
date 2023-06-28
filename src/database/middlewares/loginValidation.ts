import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().label('username'),
  password: Joi.string().required().label('password'),
}).messages({
  'any.required': '"username" and "password" are required',
  'string.empty': '"username" and "password" are required',
});
const loginValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error: unknown) {
    const validationError: ValidationError = error as ValidationError;
    const { message } = validationError.details[0];
    res.status(400).json({ message });
  }
};

export default loginValidation;