import Order from '../models/Order';
import Product from '../models/Product';
import Client from '../models/Client';

const getOrders = async () => {
  const orders = await Order.find();
  if (!orders.length) throw new Error('No hay pedidos');
  return orders;
};

const getSellerOrders = async (_, _input, { user }) => {
  const orders = await Order.find({ seller: user.id });
  if (!orders.length) throw new Error('No tienes pedidos');
  return orders;
};

const getSellerOrder = async (_, { id }, { user }) => {
  const order = await Order.findOne({ _id: id, seller: user.id });
  if (!order) throw new Error('Pedido no encontrada');
  return order;
};

const getOrdersByStatus = async (_, { status }) => {
  const orders = await Order.find({ status });
  if (!orders.length) throw new Error('No hay pedidos con ese estado');
  return orders;
};

const getSellerOrdersByStatus = async (_, { status }, { user }) => {
  const orders = await Order.find({ seller: user.id, status });
  if (!orders.length) throw new Error('No tienes pedidos con ese estado');
  return orders;
};

const verifyItemQuantity = async (item) => {
  const { id } = item;

  const product = await Product.findById(id);

  if (item.quantity > product.stock) {
    throw new Error(`Item ${product.name} exceeds stock`);
  } else {
    product.stock -= item.quantity;
    await product.save();
  }
};

const newOrder = async (_, { input }, { user }) => {
  try {
    const client = await Client.findOne({
      _id: input.client,
      seller: user.id,
    });
    if (!client) throw new Error('Cliente no encontrado');

    const itemVerifiers = input.order.map(verifyItemQuantity);
    await Promise.all(itemVerifiers);

    const order = Order(input);
    order.seller = user.id;

    const result = await order.save();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const updateOrder = async (_, { id, input }, { user }) => {
  try {
    let order = await Order.findById(id);
    if (!order) throw new Error('Pedido no encontrado');
    if (input.client) {
      const client = await Client.findOne({
        _id: input.client,
        seller: user.id,
      });
      if (!client) throw new Error('Cliente no encontrado');
    }

    if (input.order) {
      const itemVerifiers = input.order.map(verifyItemQuantity);
      await Promise.all(itemVerifiers);
    }

    order = await Order.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });
    return order;
  } catch (e) {
    throw new Error(e);
  }
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
};
