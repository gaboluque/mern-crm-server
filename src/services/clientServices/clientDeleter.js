import Client from '../../db/models/Client';
import clientShower from './clientShower';

export default async (_id, userId) => {
  try {
    await clientShower(_id, { seller: userId });
    await Client.findByIdAndDelete(_id);
    return 'Cliente eliminado';
  } catch (e) {
    throw new Error(e);
  }
};
