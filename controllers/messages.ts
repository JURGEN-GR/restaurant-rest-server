import { Request, Response } from 'express';
import { IMessage, Message, TypeMessage } from '../models/messages';

export const addMessageType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    let type = await TypeMessage.findOne({ name });
    if (type) {
      res.status(400).json({
        msg: 'Ya exite un tipo de mensaje con ese nombre',
      });
      return;
    }

    type = await TypeMessage.create({ name });
    res.status(200).json({
      msg: 'Tipo de mensaje creado correctamente',
      type,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el tipo de mensaje hable con el administrador',
      error,
    });
    return;
  }
};

export const getMessageTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const types = await TypeMessage.find();
    res.json({
      msg: 'Tipos de mensajes obtenidos correctamente',
      types,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener los tipos de mensajes hable con el administrador',
      error,
    });
    return;
  }
};

export const updateMessageType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let type = await TypeMessage.findOne({ name });
    if (type) {
      res.status(400).json({
        msg: 'Ya exite un tipo de mensaje con ese nombre',
      });
      return;
    }

    type = await TypeMessage.findByIdAndUpdate(id, { name }, { new: true });

    if (!type) {
      res.status(400).json({
        msg: 'No se encontro el tipo de mensaje',
      });
      return;
    }

    res.status(200).json({
      msg: 'Tipo de mensaje actualizado correctamente',
      type,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar el tipo de mensaje hable con el administrador',
      error,
    });
    return;
  }
};

export const deleteMessageType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    let type = await TypeMessage.findByIdAndDelete(id);

    if (!type) {
      res.status(400).json({
        msg: 'No se encontro el tipo de mensaje',
      });
      return;
    }

    res.status(200).json({
      msg: 'Tipo de mensaje eliminado correctamente',
      type,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar el tipo de mensaje hable con el administrador',
      error,
    });
    return;
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const messages = await Message.find().populate('typeMessage', 'name');

    res.json({
      msg: 'Mensajes obtenidos correctamente',
      messages,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener los mensajes hable con el administrador',
      error,
    });
    return;
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      res.status(400).json({
        msg: 'No se encontro el mensaje',
      });
      return;
    }

    res.status(200).json({
      msg: 'Mensaje eliminado correctamente',
      message,
    });
    return;
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar el mensaje hable con el administrador',
      error,
    });
    return;
  }
};
