import { Sequelize } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../models/order.model';
import { ServiceResponse } from '../../types/ServiceResponse';
import ProductModel from '../models/product.model';

const getAll = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const ordersResponse = await OrderModel.findAll({
    attributes: [
      'id', 'userId',
      [Sequelize.literal('JSON_ARRAYAGG(productIds.id)'), 'productIds'],
    ],
    include: [
      {
        model: ProductModel, as: 'productIds', attributes: [],
      },
    ],
    group: ['Order.id'], 
    raw: true,
  });
  const response:
  ServiceResponse<OrderSequelizeModel[]> = {
    type: 200, message: 'OK', data: ordersResponse,
  };
  return response;
};

export default {
  getAll,
};