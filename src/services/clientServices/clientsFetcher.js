import Client from '../../db/models/Client';

export default async (query = {}) => {
  const clients = await Client.find(query);
  return clients;
};
