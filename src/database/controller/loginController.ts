import { Request, Response } from 'express';
import loginService from '../service/loginService';

const login = async (req: Request, res: Response): Promise<Response> => {
  const { type, message, data } = await loginService.login(req.body);
  if (type > 300) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token: data });
};

export default {
  login,
};