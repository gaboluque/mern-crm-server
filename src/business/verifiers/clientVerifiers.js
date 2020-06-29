import Client from '../../db/models/Client';

const verifyClientExists = async (email) => {
  const clientExists = await Client.findOne({ email });
  if (clientExists) throw new Error('El cliente ya existe');
};

// eslint-disable-next-line import/prefer-default-export
export { verifyClientExists };
