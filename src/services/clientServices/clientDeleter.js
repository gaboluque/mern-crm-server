import Client from '../../db/models/Client';
import clientShower from './clientShower';
import Order from '../../db/models/Order';

export default async (_id, userId) => {
  try {
    await clientShower(_id, { seller: userId });
    await Client.findByIdAndDelete(_id);
    // TODO: Delete existing client orders
    await Order.deleteMany({ client: _id });
    return { id: _id };
  } catch (e) {
    throw new Error(e);
  }
};
