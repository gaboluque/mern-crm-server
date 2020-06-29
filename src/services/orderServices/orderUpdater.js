import Client from '../../db/models/Client';
import Order from '../../db/models/Order';
import orderShower from './orderShower';
import { verifyItemQuantity } from '../../business/verifiers/orderVerifiers';
import clientShower from '../clientServices/clientShower';

const verifyBusinessRules = async (orderId, orderDTO, userId) => {
  await orderShower(orderId);

  if (orderDTO.client) {
    await clientShower(orderDTO.client, { seller: userId });
  }

  if (orderDTO.order) {
    const itemVerifiers = orderDTO.order.map(verifyItemQuantity);
    await Promise.all(itemVerifiers);
  }
};

export default async (_id, orderDTO, currentUser) => {
  await verifyBusinessRules(_id, orderDTO, currentUser.id);
  try {
    const order = await Order.findOneAndUpdate({ _id }, orderDTO, {
      new: true,
    });
    return order;
  } catch (e) {
    throw new Error(e);
  }
};
