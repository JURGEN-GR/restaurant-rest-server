import { Request, Response } from 'express';
import { IDish } from '../models/dish';

export const addDish = async (req: Request, res: Response) => {
  try {
    const {}: IDish = req.body;
  } catch (error) {}
};

export const getDishes = async (req: Request, res: Response) => {
  res.json({
    ok: true,
  });
};
