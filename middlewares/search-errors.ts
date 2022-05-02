import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const searchErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: errors.formatWith(({ msg }) => msg).array()[0],
    });
  }
  next();
};
