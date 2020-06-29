import Client from '../../db/models/Client';

export default async (id, query) => {
  const client = await Client.findById(id, query);
  if (!client) throw new Error('Cliente no encontrado');
  return client;
};
