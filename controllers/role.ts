import { Request, Response } from 'express';
import Role, { IRole } from '../models/role';

export const addRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, screens }: IRole = req.body;

    let role = await Role.findOne({ name });
    if (role) {
      res.status(400).json({
        msg: 'El rol ya existe',
      });
      return;
    }

    role = await Role.create({ name, screens });
    res.json({
      msg: 'Rol creado correctamente',
      role,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el rol hable con el administrador',
    });
    return;
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find().populate('screens', 'name');
    res.json({
      msg: 'Roles obtenidos correctamente',
      roles,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener los roles hable con el administrador',
    });
    return;
  }
};

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, screens }: IRole = req.body;
    const { id } = req.params;

    let role = await Role.findById(id);
    if (!role) {
      res.status(400).json({
        msg: 'No se enconró el rol',
      });
      return;
    }

    role = await Role.findByIdAndUpdate(id, { name, screens }, { new: true });
    res.json({
      msg: 'Rol actualizado correctamente',
      role,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar el rol hable con el administrador',
    });
    return;
  }
};
