import bcryptjs from 'bcryptjs';
import User from '../../db/models/User';

export default async (userDTO) => {
  const userExists = await User.findOne({ email: userDTO.email });
  if (userExists) throw new Error('El usuario ya existe');

  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(userDTO.password, salt);

  try {
    const user = new User({ ...userDTO, password: hashedPassword });
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e);
  }
};
