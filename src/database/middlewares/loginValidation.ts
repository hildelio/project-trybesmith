import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import loginSchema from './joySchema';

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