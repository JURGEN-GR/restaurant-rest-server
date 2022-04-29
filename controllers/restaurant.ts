import { Request, Response } from 'express';
import Restaurant, { IRestaurant } from '../models/restaurant';

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { location, lat, lng }: IRestaurant = req.body;

    let restaurant = await Restaurant.findOne({ location: location });

    if (restaurant) {
      res.status(400).json({
        msg: 'El restaurante ya existe',
      });
      return;
    }

    restaurant = await Restaurant.create({ location, lat, lng });

    res.json({
      msg: 'Restaurante creado correctamente',
      restaurant,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'Error al crear el restaurante hable con el administrador',
      error,
    });
    return;
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();

    res.json({
      msg: 'Restaurantes obtenidos correctamente',
      restaurants,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'Error al obtener los restaurantes hable con el administrador',
      error,
    });
    return;
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { location, lat, lng }: IRestaurant = req.body;

    let restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(400).json({
        msg: 'No se encontro el restaurante',
      });
      return;
    }

    restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { location, lat, lng },
      { new: true }
    );

    res.json({
      msg: 'Restaurante actualizado correctamente',
      restaurant,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: 'Error al actualizar el restaurante hable con el administrador',
      error,
    });
    return;
  }
};
