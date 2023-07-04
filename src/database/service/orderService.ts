import { Sequelize } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../models/order.model';
import { ServiceResponse } from '../../types/ServiceResponse';
import ProductModel from '../models/product.model';
import { CreateOrder } from '../../types/CreateOrder';

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

const create = async ({ productIds, userId }: CreateOrder):
Promise<ServiceResponse<OrderSequelizeModel | CreateOrder>> => {
  const createOrder = await OrderModel.create({ userId });
  const productIdsToUpdate = productIds.map((product) => (product.id));

  await ProductModel.update(
    { orderId: createOrder.dataValues.id }, 
    { where: { id: productIdsToUpdate } },
  );
  return { type: 201, message: 'Created', data: { userId, productIds } };
};

export default {
  getAll,
  create,
};