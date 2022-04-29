import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string = req.header('x-token') || '';

    if (!token) {
      res.status(401).json({
        msg: 'No se ha enviado el token de autenticación',
      });
      return;
    }

    jwt.verify(token, process.env.SECRERKEY!, async (err, decode) => {
      if (err) {
        res.status(401).json({
          msg: 'Token inválido',
        });
        return;
      }

      // Validar si el usuario existe
      const { _id } = decode as IPayload;
      const user = await User.findById(_id);
      if (!user) {
        res.status(401).json({
          msg: 'Token inválido',
        });
        return;
      }
      req._id = _id;
      next();
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al validar el token de autenticación',
      error,
    });
    return;
  }
};
