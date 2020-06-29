import Order from '../../db/models/Order';

export default async (query = {}) => {
  const orders = await Order.find(query);
  if (!orders.length) throw new Error('No hay pedidos');
  return orders;
};
