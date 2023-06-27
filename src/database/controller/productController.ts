import { Request, Response } from 'express';
import productService from '../service/productService';

const create = async (req: Request, res: Response): Promise<Response> => {
  const { type, data } = await productService.create(req.body);
  return res.status(type).json(data);
};

export default {
  create,
};