import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/User';
import Order from '../models/Order';

const getUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUser = async (_, { token }) => {
  const { id } = jwt.verify(token, process.env.SECRET);
  const user = await User.findOne({ _id: id });
  return user;
};

const getBestSellers = async () => {
  const sellers = await Order.aggregate([
    { $match: { status: 'COMPLETED' } },
    {
      $group: {
        _id: '$seller',
        total: { $sum: '$total' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'seller',
      },
    },
    {
      $limit: 3,
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return sellers;
};

const newUser = async (_, { input }) => {
  const userExists = await User.findOne({ email: input.email });
  if (userExists) throw new Error('El usuario ya existe');

  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(input.password, salt);

  try {
    const user = new User({ ...input, password: hashedPassword });
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

const createToken = ({ id, email, name, lastName }, expiresIn) => {
  return jwt.sign({ id, email, name, lastName }, process.env.SECRET, {
    expiresIn,
  });
};

const authUser = async (_, { input }) => {
  const foundUser = await User.findOne({ email: input.email });
  if (!foundUser) throw new Error('El usuario no existe');

  const validPassword = bcryptjs.compareSync(
    input.password,
    foundUser.password
  );
  if (!validPassword) throw new Error('Contraseña incorrecta');

  return {
    token: createToken(foundUser, 60 * 60),
  };
};

export const userQueries = { getUsers, getUser, getBestSellers };
export const userMutations = { newUser, authUser };
