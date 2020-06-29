import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../db/models/User';

const createToken = ({ id, email, name, lastName }, expiresIn) => {
  return jwt.sign({ id, email, name, lastName }, process.env.SECRET, {
    expiresIn,
  });
};

const verifyBusinessRules = async ({ email, password }) => {
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new Error('El usuario no existe');

  const validPassword = bcryptjs.compareSync(password, foundUser.password);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  return foundUser;
};

export default async (auth) => {
  const user = await verifyBusinessRules(auth);
  return {
    token: createToken(user, 60 * 60),
    user,
  };
};
