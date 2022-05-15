import { check } from 'express-validator';
import { searchErrors } from '../middlewares/search-errors';

export const validationsAddRole = [
  check('name', 'El nombre no es valido').escape().not().isEmpty(),
  check('screens', 'La pantalla no es valida').not().isEmpty().isMongoId(),
  searchErrors,
];

export const validationsUpdateRole = [
  check('id', 'El id no es valido').escape().isMongoId(),
  check('name', 'El nombre no es valido')
    .if(check('name').exists())
    .escape()
    .not()
    .isEmpty(),
  check('screens', 'Una de las pantallas no es valida')
    .if(check('screens').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  searchErrors,
];
