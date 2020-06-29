import Order from '../../db/models/Order';

export default async (id, query) => {
  const order = await Order.findById(id, query);
  if (!order) throw new Error('Pedido no encontrado');
  return order;
};
