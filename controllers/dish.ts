import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import Dish, { IDish } from '../models/dish';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, menu }: IDish = req.body;
    let dish = await Dish.findOne({ name });
    if (dish) {
      res.status(400).json({
        msg: 'Ya exite un platillo con ese nombre',
      });
      return;
    }
    dish = await (
      await Dish.create({
        name,
        description,
        menu,
        price,
      })
    ).populate('menu', 'name');
    res.status(201).json({
      msg: 'Platillo creado correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al agregar el platillo hable con el administrador',
    });
  }
};

export const getDishes = async (req: Request, res: Response): Promise<void> => {
  try {
    const dishes = await Dish.find().populate('menu', 'name');
    res.status(200).json({
      msg: 'Platillos obtenidos correctamente',
      dishes,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los platillos',
    });
  }
};

export const getDish = async (req: Request, res: Response): Promise<void> => {
  try {
    const dish = await Dish.findById(req.params.id).populate('menu', 'name');
    res.status(200).json({
      msg: 'Platillo obtenido correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener el platillo',
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
        msg: 'Platillo no encontrado',
      });
      return;
    }
    res.status(200).json({
      msg: 'Platillo actualizado correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el platillo hable con el administrador',
    });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);

    if (!dish) {
      res.status(404).json({
        msg: 'No se encontró el platillo',
      });
      return;
    }

    if (dish.media_library.length > 0) {
      dish.media_library.forEach(async (image) => {
        try {
          // Borrar la imagen
          const nameImage = image.split('/').pop();
          const [publicId, type] = nameImage!.split('.');
          const formatsVideo = ['mp4', 'wmv', 'avi', 'mov'];

          if (formatsVideo.includes(type)) {
            await cloudinary.uploader.destroy(publicId, {
              resource_type: 'video',
            });
          } else {
            await cloudinary.uploader.destroy(publicId, {
              resource_type: 'image',
            });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            msg: 'Error al eliminar las imagenes del platillo, hable con el administrador',
          });
          return;
        }
      });
    }

    await dish.remove();

    res.status(200).json({
      msg: 'Platillo eliminado correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al eliminar el platillo hable con el administrador',
    });
  }
};
