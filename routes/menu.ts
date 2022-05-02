import { Router } from 'express';
import { check } from 'express-validator';
import * as menuController from '../controllers/menu';
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
  menuController.addMenu
);
router.get('/', menuController.getMenus);
router.put(
  '/:id',
  [
    check('name', 'El nombre no es valido').escape().not().isEmpty(),
    searchErrors,
  ],
  menuController.updateMenu
);

export default router;
