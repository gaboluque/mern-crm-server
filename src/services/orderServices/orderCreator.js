import { verifyItemQuantity } from '../../business/verifiers/orderVerifiers';
import Client from '../../db/models/Client';
import Order from '../../db/models/Order';
import clientShower from '../clientServices/clientShower';

const verifyBusinessRules = async (orderDTO, userId) => {
  await clientShower(orderDTO.client, {
    seller: userId,
  });

  const itemVerifiers = orderDTO.order.map(verifyItemQuantity);
  await Promise.all(itemVerifiers);
};

export default async (orderDTO, currentUser) => {
  await verifyBusinessRules(orderDTO, currentUser.id);

  try {
    const order = Order(orderDTO);
    order.seller = currentUser.id;
    const result = await order.save();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
