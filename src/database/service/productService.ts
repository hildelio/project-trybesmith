import { Product } from '../../types/Product';
import { ServiceResponse } from '../../types/ServiceResponse';
import ProductModel from '../models/product.model';

const create = async ({ name, price, orderId }: Product): Promise<ServiceResponse<Product>> => {
  const response = await ProductModel.create({ name, price, orderId });
  // if (!response) {
  //   return { type: 500, message: 'Internal Server Error', data: null };
  // }
  return { type: 201, message: 'Created', data: response.dataValues };
};

const getAll = async (): Promise<ServiceResponse<Product[]>> => {
  const response = await ProductModel.findAll();
  console.log(response);
  const threatedResponse = response.map((product) => (product.dataValues));
  return { type: 200, message: 'OK', data: threatedResponse };
};

export default {
  create,
  getAll,
};