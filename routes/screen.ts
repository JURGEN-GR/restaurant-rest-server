import { Router } from 'express';
import { check } from 'express-validator';
import * as screenController from '../controllers/screen';
import { searchErrors } from '../middlewares/search-errors';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post(
  '/',
  [
    check('name', 'El nombre no es valido').escape().not().isEmpty(),
    searchErrors,
  ],
  screenController.addScreen
);

router.get('/', screenController.getScreens);

export default router;
