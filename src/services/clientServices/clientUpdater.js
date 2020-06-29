import Client from '../../db/models/Client';
import clientShower from './clientShower';

export default async (id, clientDTO, userId) => {
  try {
    let client = await clientShower(id, { seller: userId });
    client = await Client.findOneAndUpdate({ _id: id }, clientDTO, {
      new: true,
    });
    return client;
  } catch (e) {
    throw new Error(e);
  }
};
