import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number().required(),
});

const productValidation = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    await productSchema.validateAsync(req.body);
    next();
  } catch (error:unknown) {
    const validationError:ValidationError = error as ValidationError;
    const { message } = validationError.details[0];
    if (message.includes('is required')) {
      res.status(400).json({ message });
    } else {
      res.status(422).json({ message });
    }
  }
};

export default productValidation;
