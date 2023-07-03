import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

const createOrderSchema = Joi.object({
  productIds: Joi
    .array().required().min(1)
    .label('productIds'),
  userId: Joi
    .number().required().max(3).min(1)
    .label('userId'),
}).messages({
  'any.required': '400{{#label}} is required', 
  'array.base': '422{{#label}} must be an array', 
  'array.min': '422{{#label}} must include only numbers',
  'number.base': '422{{#label}} must be a number',
  'number.max': '404{{#label}} not found', 
  'number.min': '404{{#label}} not found', 
});

const orderValidation = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    await createOrderSchema.validateAsync(req.body);
    next();
  } catch (error:unknown) {
    const validationError:ValidationError = error as ValidationError;
    const { message } = validationError.details[0];

    const regex = /^(\d{3})(.*)$/;
    const matches = message.match(regex);

    // if (message.includes('must be a number')) {
    //   res.status(422).json({ message: '"userId" must be a number' });
    // } else
    
    if (matches) {
      const status = Number(matches[1]);
      const errorMessage = matches[2];
      res.status(status).json({ message: errorMessage });
    }
    
    // const status = Number(message.slice(0, 3));    
    // const errorMessage = message.slice(3);  
    // res.status(status).json({ message: errorMessage });
  }
};

export default orderValidation;