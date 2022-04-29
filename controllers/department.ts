import { Request, Response } from 'express';
import Department, { IDepartment } from '../models/department';

export const addDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name }: IDepartment = req.body;

    let department = await Department.findOne({ name });
    if (department) {
      res.status(400).json({
        msg: 'El departamento ya existe',
      });
      return;
    }

    department = await Department.create({ name });
    res.json({
      msg: 'Departamento creado correctamente',
      department,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el departamento hable con el administrador',
      error,
    });
    return;
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find();
    res.json({
      msg: 'Departamentos obtenidos correctamente',
      departments,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los departamentos hable con el administrador',
    });
    return;
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { name }: IDepartment = req.body;
    const { id } = req.params;

    const department = await Department.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!department) {
      res.status(400).json({
        msg: 'No se encontro el departamento',
      });
      return;
    }

    res.json({
      msg: 'Departamento actualizado correctamente',
      department,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al actualizar el departamento hable con el administrador',
      error,
    });
    return;
  }
};
