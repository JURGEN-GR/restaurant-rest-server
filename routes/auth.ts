import { Router } from 'express';
import { check } from 'express-validator';
import * as authController from '../controllers/auth';
import { searchErrors } from '../middlewares/search-errors';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El email no es valido').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    searchErrors,
  ],
  authController.login
);
router.post('/renew', validateJwt, authController.revalidateToken);

export default router;
