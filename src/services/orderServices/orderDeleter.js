import Order from '../../db/models/Order';
import orderShower from './orderShower';

const verifyBusinessRules = async (orderId) => {
  await orderShower(orderId);
};

export default async (_id) => {
  await verifyBusinessRules(_id);
  // TODO: Add deleted items to stock
  try {
    await Order.findByIdAndDelete({ _id });
  } catch (e) {
    throw new Error(e);
  }
};
