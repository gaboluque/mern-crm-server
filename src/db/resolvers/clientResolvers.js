import bestClientsFetcher from '../../services/clientServices/bestClientsFetcher';
import clientCreator from '../../services/clientServices/clientCreator';
import clientDeleter from '../../services/clientServices/clientDeleter';
import clientsFetcher from '../../services/clientServices/clientsFetcher';
import clientShower from '../../services/clientServices/clientShower';
import clientUpdater from '../../services/clientServices/clientUpdater';

const getSellerClients = async (_, _input, { user }) => {
  const clients = await clientsFetcher({ seller: user.id });
  return clients;
};

const getClients = async () => {
  const clients = await clientsFetcher();
  return clients;
};

const getClient = async (_, { id }, { user }) => {
  const client = await clientShower(id, { seller: user.id });
  return client;
};

const getBestClients = async () => {
  const clients = await bestClientsFetcher();
  return clients;
};

const newClient = async (_, { input }, { user }) => {
  const client = clientCreator(input, user.id);
  return client;
};

const updateClient = async (_, { id, input }, { user }) => {
  const client = await clientUpdater(id, input, user.id);
  return client;
};

const deleteClient = async (_, { id }, { user }) => {
  const response = await clientDeleter(id, user.id);
  return response;
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
