import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';
import { decodedToken } from '../../utils/tokenJWT';

const tokenSchema = Joi.string().required().messages({
  'string.empty': 'Token not found',
  'any.required': 'Token not found', 
});

export const hasToken = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  try {
    const { authorization } = req.headers;
    await tokenSchema.validateAsync(authorization);
    return next();
  } catch (error:unknown) {
    const validationError:ValidationError = error as ValidationError;
    const { message } = validationError.details[0];
    if (message.includes('not found')) {
      return res.status(401).json({ message });
    }
    return res.status(500).json({ message: 'internal server error' });
  }

  // const { authorization } = req.headers;
  // const { error } = tokenSchema.validate(authorization);
  // if (error) {
  //   res.status(401).json({ message: error.message });
  //   return;
  // }
  // const token = authorization as string;
  // try {
  //   decodedToken(token);    
  //   next();
  // } catch (err) {
  //   res.status(401).json({ message: 'Invalid token' });
  // }
};

export const tokenValidation = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  const { authorization } = req.headers;
  const token = authorization as string;
  try {
    decodedToken(token);
    return next();
  } catch (err:unknown) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default {
  hasToken,
  tokenValidation,
};