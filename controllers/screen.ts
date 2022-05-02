import { Request, Response } from 'express';
import ScreenModel, { IScreen } from '../models/screen';

export const addScreen = async (req: Request, res: Response): Promise<void> => {
  const { name }: IScreen = req.body;

  try {
    let screen = await ScreenModel.findOne({ name });

    if (screen) {
      res.status(400).json({
        msg: 'Ya exite una pantalla con ese nombre',
      });
      return;
    }

    screen = await ScreenModel.create({ name });
    res.status(200).json({
      msg: 'Pantalla creada correctamente',
      screen,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear la pantalla contacte al administrador',
      error,
    });
    return;
  }
};

export const getScreens = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const screens = await ScreenModel.find();
    res.status(200).json({
      msg: 'Pantallas obtenidas correctamente',
      screens,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener las pantallas contacte al administrador',
      error,
    });
    return;
  }
};
