import { check } from 'express-validator';
import { searchErrors } from '../middlewares/search-errors';

export const validationsAddUser = [
  check('name', 'El nombre no es valido').escape().not().isEmpty(),
  check('email', 'El correo no es valido').trim().not().isEmpty().isEmail(),
  check('password', 'La contraseña no es valida, debe ser mayor a 6 caracteres')
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check(
    'dateStart',
    'La fecha de inicio no es valida, formato valido: YYYY-MM-DD'
  )
    .not()
    .isEmpty()
    .isDate({ format: 'YYYY-MM-DD' }),
  check(
    'birthday',
    'La fecha de cumpleaños no es valida, formato valido: YYYY-MM-DD'
  )
    .not()
    .isEmpty()
    .isDate({ format: 'YYYY-MM-DD' }),
  check('restaurant', 'El restaurante no es valido')
    .not()
    .isEmpty()
    .isMongoId(),
  check('role', 'El rol no es valido').not().isEmpty().isMongoId(),
  check('department', 'El departamento no es valido')
    .not()
    .isEmpty()
    .isMongoId(),
  searchErrors,
];
export const validationsUpdateUser = [
  check('name', 'El nombre no es valido')
    .if(check('name').exists())
    .escape()
    .not()
    .isEmpty(),
  check('email', 'El correo no es valido')
    .if(check('email').exists())
    .trim()
    .not()
    .isEmpty()
    .isEmail(),
  check('password', 'La contraseña no es valida, debe ser mayor a 6 caracteres')
    .if(check('password').exists())
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  check(
    'dateStart',
    'La fecha de inicio no es valida, formato valido: YYYY-MM-DD'
  )
    .if(check('dateStart').exists())
    .not()
    .isEmpty()
    .isDate({ format: 'YYYY-MM-DD' }),
  check(
    'birthday',
    'La fecha de cumpleaños no es valida, formato valido: YYYY-MM-DD'
  )
    .if(check('birthday').exists())
    .not()
    .isEmpty()
    .isDate({ format: 'YYYY-MM-DD' }),
  check('restaurant', 'El restaurante no es valido')
    .if(check('restaurant').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  check('role', 'El rol no es valido')
    .if(check('role').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  check('department', 'El departamento no es valido')
    .if(check('department').exists())
    .not()
    .isEmpty()
    .isMongoId(),
  searchErrors,
];
