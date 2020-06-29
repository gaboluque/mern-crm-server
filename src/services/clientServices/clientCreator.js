import Client from '../../db/models/Client';
import { verifyClientExists } from '../../business/verifiers/clientVerifiers';

const verifyBusinessRules = async ({ email }) => {
  await verifyClientExists(email);
};

export default async (clientDTO, userId) => {
  await verifyBusinessRules(clientDTO);

  try {
    const client = new Client({ ...clientDTO, seller: userId });
    await client.save();
    return client;
  } catch (e) {
    throw new Error(e);
  }
};
