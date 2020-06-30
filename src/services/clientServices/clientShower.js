import Client from '../../db/models/Client';

export default async (_id, query = {}) => {
  const params = { _id, ...query };
  const client = await Client.findOne(params);
  if (!client) throw new Error('Cliente no encontrado');
  return client;
};
