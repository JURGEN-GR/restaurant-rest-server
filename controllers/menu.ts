import { Request, Response } from 'express';
import Menu from '../models/menu';

export const addMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    let menu = await Menu.findOne({ name });
    if (menu) {
      res.status(400).json({
        msg: 'Ya exite un menu con ese nombre',
      });
      return;
    }

    menu = await Menu.create({ name });
    res.json({
      msg: 'Menu creado correctamente',
      menu,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el menu hable con el administrador',
    });
    return;
  }
};

export const getMenus = async (req: Request, res: Response): Promise<void> => {
  try {
    const menus = await Menu.find();
    res.json({
      msg: 'Menus obtenidos correctamente',
      menus,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los menus hable con el administrador',
    });
    return;
  }
};

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let menu = await Menu.findOne({ name });
    if (menu) {
      res.status(400).json({
        msg: 'Ya exite un menu con ese nombre',
      });
      return;
    }

    menu = await Menu.findByIdAndUpdate(id, { name }, { new: true });
    if (!menu) {
      res.status(400).json({
        msg: 'El menu no existe',
      });
      return;
    }
    res.json({
      msg: 'Menu actualizado correctamente',
      menu,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el menu hable con el administrador',
    });
    return;
  }
};
