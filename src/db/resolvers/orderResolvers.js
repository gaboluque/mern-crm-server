import orderCreator from '../../services/orderServices/orderCreator';
import ordersFetcher from '../../services/orderServices/ordersFetcher';
import orderShower from '../../services/orderServices/orderShower';
import orderUpdater from '../../services/orderServices/orderUpdater';
import orderDeleter from '../../services/orderServices/orderDeleter';

const getOrders = async () => {
  const orders = await ordersFetcher();
  return orders;
};

const getSellerOrders = async (_, _input, { user }) => {
  const orders = await ordersFetcher({ seller: user.id });
  return orders;
};

const getSellerOrder = async (_, { id }, { user }) => {
  const order = await orderShower(id, { seller: user.id });
  return order;
};

const getOrdersByStatus = async (_, { status }) => {
  const orders = await ordersFetcher({ status });
  return orders;
};

const getSellerOrdersByStatus = async (_, { status }, { user }) => {
  const orders = await ordersFetcher({ seller: user.id, status });
  return orders;
};

const newOrder = async (_, { input }, { user }) => {
  const order = await orderCreator(input, user);
  return order;
};

const updateOrder = async (_, { id, input }, { user }) => {
  const order = await orderUpdater(id, input, user);
  return order;
};

const deleteOrder = async (_, { id }, { user }) => {
  await orderDeleter(id, user);
  return { id };
};

export const orderQueries = {
  getOrders,
  getSellerOrders,
  getSellerOrder,
  getOrdersByStatus,
  getSellerOrdersByStatus,
};

export const orderMutations = {
  newOrder,
  updateOrder,
  deleteOrder,
};
