import { Request, Response } from 'express';
import Dish, { IDish } from '../models/dish';

export const addDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, menu }: IDish = req.body;
    let dish = await Dish.findOne({ name });
    if (dish) {
      res.status(400).json({
        message: 'El plato ya existe',
      });
      return;
    }
    dish = await Dish.create({
      name,
      description,
      menu,
      price,
    });
    res.status(201).json({
      msg: 'Plato creado correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al agregar el plato hable con el administrador',
    });
  }
};

export const getDishes = async (req: Request, res: Response): Promise<void> => {
  try {
    const dishes = await Dish.find().populate('menu', 'name');
    res.status(200).json({
      msg: 'Platos obtenidos correctamente',
      dishes,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los platos',
    });
  }
};

export const updateDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { media_library, ...rest }: IDish = req.body;

    const dish = await Dish.findByIdAndUpdate(id, rest, { new: true }).populate(
      'menu',
      'name'
    );

    if (!dish) {
      res.status(404).json({
        msg: 'Plato no encontrado',
      });
      return;
    }
    res.status(200).json({
      msg: 'Plato actualizado correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el plato hable con el administrador',
    });
  }
};
