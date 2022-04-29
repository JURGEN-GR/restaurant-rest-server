import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import bcryptjs from 'bcryptjs';
import { generateJwt } from '../helpers/generate-jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: IUser = req.body;
    const user = await User.findOne({ email }).populate(
      'role department restaurant',
      'name location'
    );
    // Validar si el usuario existe
    if (!user) {
      res.status(400).json({
        msg: 'Alguno de los campos es incorrecto',
      });
      return;
    }
    // Comparar contraseña
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        msg: 'Alguno de los campos es incorrecto',
      });
      return;
    }
    // Generar token
    const token = await generateJwt(user._id.toString());

    res.status(200).json({
      msg: 'Usuario autenticado correctamente',
      user,
      token,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Ocurrió un error al intentar iniciar sesión',
      error,
    });
    return;
  }
};

export const revalidateToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req;
    const token = await generateJwt(_id);
    res.status(200).json({
      msg: 'Token renovado correctamente',
      token,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Ocurrió un error al intentar renovar el token hable con el administrador',
      error,
    });
    return;
  }
};
