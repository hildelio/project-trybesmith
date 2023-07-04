import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

const createOrderSchema = Joi.object({
  productIds: Joi.array().required().min(1)
    .label('productIds'),
  userId: Joi.number().strict().exist().required()
    .max(3)
    .min(1)
    .label('userId'),
}).messages({
  'any.required': '400{{#label}} is required', 
  'array.base': '422{{#label}} must be an array', 
  'array.min': '422{{#label}} must include only numbers',
  'number.base': '422{{#label}} must be a number',
  'number.max': '404{{#label}} not found', 
  'number.min': '404{{#label}} not found',
  'number.strict': '422{{#label}} must be a number',
});

const orderValidation = async (req:Request, res:Response, next:NextFunction):
Promise<Response | void> => {
  try {
    await createOrderSchema.validateAsync(req.body);    
    return next();
  } catch (error:unknown) {    
    const validationError:ValidationError = error as ValidationError;
    const { message } = validationError.details[0];

    const status = Number(message.slice(0, 3));    
    const errorMessage = message.slice(3);  
    res.status(status).json({ message: errorMessage });
    // const regex = /^(\d{3})(.*)$/;
    // const matches = message.match(regex);
    
    // if (matches) {
    //   const status = Number(matches[1]);
    //   const errorMessage = matches[2];
    //   return res.status(status).json({ message: errorMessage });
    // }
  }
};

export default orderValidation;