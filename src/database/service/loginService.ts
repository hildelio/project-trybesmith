import bcrypt from 'bcrypt';
import { LoginUser } from '../../types/LoginUser';
import { ServiceResponse } from '../../types/ServiceResponse';
import { tokenGenerator } from '../../utils/tokenJWT';
import UserModel from '../models/user.model';

const login = async ({ username, password }: LoginUser): Promise<ServiceResponse<LoginUser>> => {
  const response = await UserModel.findOne({ where: { username } });
  
  if (!response) {
    return { type: 401, message: 'Username or password invalid', data: null };
  }

  const storedPassword = response.dataValues.password;
  const passwordMatch = await bcrypt.compare(password, storedPassword);

  if (!passwordMatch) {
    return { type: 401, message: 'Username or password invalid', data: null };
  }

  const token = tokenGenerator({ id: response.dataValues.id });
  return { type: 200, message: 'User Authenticated', data: token };
};

export default {
  login,
};