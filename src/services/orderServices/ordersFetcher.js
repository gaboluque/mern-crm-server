import Order from '../../db/models/Order';

export default async (query = {}) => {
  const orders = await Order.find(query).populate('client');
  if (!orders.length) throw new Error('No hay pedidos');
  return orders;
};
