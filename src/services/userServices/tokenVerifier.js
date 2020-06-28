import jwt from 'jsonwebtoken';
import User from '../../db/models/User';

export default async (token) => {
  const { id } = jwt.verify(token, process.env.SECRET);
  const user = await User.findOne({ _id: id });
  return user;
};
