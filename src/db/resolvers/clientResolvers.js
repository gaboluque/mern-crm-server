import Client from '../models/Client';
import Order from '../models/Order';

const getSellerClients = async (_, _input, { user }) => {
  const clients = await Client.find({ seller: user.id });
  return clients;
};

const getClients = async () => {
  const clients = await Client.find({});
  return clients;
};

const getClient = async (_, { id }, { user }) => {
  const client = await Client.findOne({ _id: id, seller: user.id });
  if (!client) throw new Error('Cliente no encontrado');
  return client;
};

const getBestClients = async () => {
  const clients = await Order.aggregate([
    { $match: { status: 'COMPLETED' } },
    {
      $group: {
        _id: '$client',
        total: { $sum: '$total' },
      },
    },
    {
      $lookup: {
        from: 'clients',
        localField: '_id',
        foreignField: '_id',
        as: 'client',
      },
    },
    {
      $limit: 3,
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return clients;
};

const newClient = async (_, { input }, { user }) => {
  const clientExists = await Client.findOne({ email: input.email });
  if (clientExists) throw new Error('El cliente ya existe');

  try {
    const client = new Client({ ...input, seller: user.id });
    await client.save();
    return client;
  } catch (e) {
    throw new Error(e);
  }
};

const updateClient = async (_, { id, input }, { user }) => {
  try {
    let client = await Client.findOne({ _id: id, seller: user.id });
    if (!client) throw new Error('Cliente no encontrado');
    client = await Client.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });
    return client;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteClient = async (_, { id }, { user }) => {
  try {
    const client = await Client.findOne({ _id: id, seller: user.id });
    if (!client) throw new Error('Cliente no encontrado');
    await Client.findByIdAndDelete({ _id: id });
    return 'Cliente eliminado';
  } catch (e) {
    throw new Error(e);
  }
};

export const clientQueries = {
  getSellerClients,
  getClients,
  getClient,
  getBestClients,
};

export const clientMutations = {
  newClient,
  updateClient,
  deleteClient,
};
