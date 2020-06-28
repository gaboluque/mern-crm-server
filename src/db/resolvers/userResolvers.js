import bestSellerFetcher from '../../services/userServices/bestSellerFetcher';
import sessionCreator from '../../services/userServices/sessionCreator';
import tokenVerifier from '../../services/userServices/tokenVerifier';
import userCreator from '../../services/userServices/userCreator';
import User from '../models/User';

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUser = async (_, { token }) => {
  const user = await tokenVerifier(token);
  return user;
};

const getBestSellers = async () => {
  const sellers = await bestSellerFetcher();
  return sellers;
};

const newUser = async (_, { input }) => {
  const user = await userCreator(input);
  return user;
};

const authUser = async (_, { input }) => {
  const auth = sessionCreator(input);
  return auth;
};

const verifyToken = async (_, _params, ctx) => {
  if (ctx.user) return ctx.user;
  throw new Error('Debes iniciar sesión');
};

export const userQueries = { getUsers, getUser, getBestSellers };
export const userMutations = { newUser, authUser, verifyToken };
