import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../db/models/User';

const createToken = ({ id, email, name, lastName }, expiresIn) => {
  return jwt.sign({ id, email, name, lastName }, process.env.SECRET, {
    expiresIn,
  });
};

export default async (auth) => {
  const foundUser = await User.findOne({ email: auth.email });
  if (!foundUser) throw new Error('El usuario no existe');

  const validPassword = bcryptjs.compareSync(auth.password, foundUser.password);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  return {
    token: createToken(foundUser, 60 * 60),
    user: foundUser,
  };
};
