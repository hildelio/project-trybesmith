import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().label('username'),
  password: Joi.string().required().label('password'),
}).messages({
  'any.required': '"username" and "password" are required',
  'string.empty': '"username" and "password" are required',
});

export default loginSchema;