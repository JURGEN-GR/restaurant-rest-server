import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import User from '../models/user';
import Dish from '../models/dish';
import { UploadedFile } from 'express-fileupload';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formats = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg',
  'mp4',
  'wmv',
  'avi',
  'mov',
];

export const uploadImageUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.files) {
      res.status(400).json({
        msg: 'No se encontró ningún archivo',
      });
      return;
    }

    const { id } = req.params;
    const file = req.files!.file as UploadedFile;

    const fileFormat = file.mimetype.split('/')[1];
    if (!formats.includes(fileFormat)) {
      res.status(400).json({
        msg: `formato de archivo no permitido solo se aceptan: ${formats.join(
          ', '
        )}`,
      });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        msg: 'No se encontró el usuario',
      });
      return;
    }

    // Borrar la imagen anterior
    if (user.picture) {
      const nameImage = user.picture.split('/').pop();
      const [publicId] = nameImage!.split('.');
      await cloudinary.uploader.destroy(publicId);
    }

    // Subir la nueva imagen
    const { url } = await cloudinary.uploader.upload(file.tempFilePath);
    user.picture = url;
    await user.save();

    res.json({
      msg: 'Imagen subida correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al subir el archivo hable con el administrador',
    });
  }
};

export const deleteImageUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        msg: 'No se encontró el usuario',
      });
      return;
    }

    // Borrar la imagen anterior
    if (user.picture) {
      const nameImage = user.picture.split('/').pop();
      const [publicId] = nameImage!.split('.');
      await cloudinary.uploader.destroy(publicId);
    }

    user.picture = '';
    await user.save();

    res.json({
      msg: 'Imagen eliminada correctamente',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al eliminar la imagen hable con el administrador',
    });
  }
};

export const uploadImageDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.files) {
      res.status(400).json({
        msg: 'No se encontró ningún archivo',
      });
      return;
    }

    const file = req.files!.file as UploadedFile;

    const fileFormat = file.mimetype.split('/')[1];
    if (!formats.includes(fileFormat)) {
      res.status(400).json({
        msg: `formato de archivo no permitido solo se aceptan: ${formats.join(
          ', '
        )}`,
      });
      return;
    }

    const { id } = req.params;
    const dish = await Dish.findById(id);
    if (!dish) {
      res.status(400).json({
        msg: 'No se encontró el plato',
      });
      return;
    }

    // Validar que no suban mas de 4 imagenes
    if (dish!.media_library.length === 4) {
      res.status(400).json({
        msg: 'No puedes subir más de 4 imagenes, elimina una para poder subir otra',
      });
      return;
    }

    // Subir la nueva imagen
    const { url } = await cloudinary.uploader.upload(file.tempFilePath);
    dish.media_library.push(url);
    await dish.save();

    // Subir la nueva imagen
    res.json({
      msg: 'Imagen subida correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al subir el archivo hable con el administrador',
    });
  }
};

export const deleteImageDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const dish = await Dish.findById(id);
    if (!dish) {
      res.status(400).json({
        msg: 'No se encontró el plato',
      });
      return;
    }

    if (dish.media_library.length === 0) {
      res.status(400).json({
        msg: 'No hay imagenes para eliminar',
      });
      return;
    }

    // Borrar la imagen anterior
    const nameImage = url.split('/').pop();
    const [publicId] = nameImage!.split('.');
    await cloudinary.uploader.destroy(publicId);

    // Eliminar la imagen del array
    const index = dish.media_library.indexOf(url);
    dish.media_library.splice(index, 1);
    await dish.save();

    res.json({
      msg: 'Imagen eliminada correctamente',
      dish,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al eliminar la imagen hable con el administrador',
    });
  }
};
