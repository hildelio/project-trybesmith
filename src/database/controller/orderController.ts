import { Request, Response } from 'express';
import orderService from '../service/orderService';

const getAll = async (req: Request, res: Response): Promise<Response> => {
  const { type, data } = await orderService.getAll();
  return res.status(type).json(data);
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { type, data } = await orderService.create(req.body);
  return res.status(type).json(data);
};

export default {
  getAll,
  create,
};