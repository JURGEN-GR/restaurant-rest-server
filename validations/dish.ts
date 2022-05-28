import { check } from 'express-validator';
import { searchErrors } from '../middlewares/search-errors';

export const validationsAddDish = [
  check('name', 'El nombre no es válido').not().isEmpty(),
  check('description', 'La descripción no es válida').not().isEmpty(),
  check('menu', 'El menú no es válido').not().isEmpty().isMongoId(),
  check('price', 'El precio no es válido').not().isEmpty().isNumeric(),
  searchErrors,
];

export const validationsUpdateDish = [
  check('id', 'El id no es valido').isMongoId(),
  check('name', 'El nombre no es válido')
    .if(check('name').exists())

    .not()
    .isEmpty(),
  check('description', 'La descripción no es válida')
    .if(check('description').exists())

    .not()
    .isEmpty(),
  check('menu', 'El menú no es válido')
    .if(check('menu').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  check('price', 'El precio no es válido')
    .if(check('price').exists())

    .not()
    .isEmpty()
    .isNumeric(),
  searchErrors,
];
