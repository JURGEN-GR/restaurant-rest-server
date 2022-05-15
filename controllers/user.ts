import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { active, ...data }: IUser = req.body;
    let user = await User.findOne({ email: data.email });
    if (user) {
      res.status(400).json({
        msg: 'Correo no disponible',
      });
      return;
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    user = await (
      await User.create(data)
    ).populate('role department restaurant', 'name location');

    res.status(201).json({
      msg: 'Usuario creado correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el usuario hable con el administrador',
      error,
    });
    return;
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate(
      'role department restaurant',
      'name location'
    );
    res.status(200).json({
      msg: 'Usuarios obtenidos correctamente',
      users,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los usuarios hable con el administrador',
      error,
    });
    return;
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      'role department restaurant',
      'name location'
    );
    res.status(200).json({
      msg: 'Usuario obtenido correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener el usuario hable con el administrador',
      error,
    });
    return;
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { ...data }: IUser = req.body;

    // Encriptar contraseña
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true }).populate(
      'role department restaurant',
      'name location'
    );

    if (!user) {
      res.status(404).json({
        msg: 'No se encontró el usuario',
      });
      return;
    }

    res.status(200).json({
      msg: 'Usuario actualizado correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el usuario hable con el administrador',
      error,
    });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        msg: 'No se encontró el usuario',
      });
      return;
    }

    res.status(200).json({
      msg: 'Usuario eliminado correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al eliminar el usuario hable con el administrador',
      error,
    });
    return;
  }
};
