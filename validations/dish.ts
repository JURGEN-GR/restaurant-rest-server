import { check } from 'express-validator';
import { searchErrors } from '../middlewares/search-errors';

export const validationsAddDish = [
  check('name', 'El nombre no es válido').escape().not().isEmpty(),
  check('description', 'La descripción no es válida').escape().not().isEmpty(),
  check('menu', 'El menú no es válido').not().isEmpty().isMongoId(),
  check('price', 'El precio no es válido').escape().not().isEmpty().isNumeric(),
  searchErrors,
];

export const validationsUpdateDish = [
  check('id', 'El id no es valido').escape().isMongoId(),
  check('name', 'El nombre no es válido')
    .if(check('name').exists())
    .escape()
    .not()
    .isEmpty(),
  check('description', 'La descripción no es válida')
    .if(check('description').exists())
    .escape()
    .not()
    .isEmpty(),
  check('menu', 'El menú no es válido')
    .if(check('menu').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  check('price', 'El precio no es válido')
    .if(check('price').exists())
    .escape()
    .not()
    .isEmpty()
    .isNumeric(),
  searchErrors,
];
