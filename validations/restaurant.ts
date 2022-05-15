import { check } from 'express-validator';
import { searchErrors } from '../middlewares/search-errors';

export const validationsAddRestaurant = [
  check('location', 'La dirección no es valida').not().isEmpty(),
  check('lat', 'La latitud no es valida').not().isEmpty().isNumeric(),
  check('lng', 'La longitud no es valida').not().isEmpty().isNumeric(),
  searchErrors,
];

export const validationsUpdateRestaurant = [
  check('id', 'El id no es valido').escape().isMongoId(),
  check('location', 'La dirección no es valida')
    .if(check('location').exists())
    .not()
    .isEmpty(),
  check('lat', 'La latitud no es valida')
    .if(check('lat').exists())
    .not()
    .isEmpty()
    .isNumeric(),
  check('lng', 'La longitud no es valida')
    .if(check('lng').exists())
    .not()
    .isEmpty()
    .isNumeric(),
  searchErrors,
];
