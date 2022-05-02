import { Router } from 'express';
import { check } from 'express-validator';
import * as departmentController from '../controllers/department';
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
  departmentController.addDepartment
);
router.get('/', departmentController.getDepartments);
router.put(
  '/:id',
  [
    check('name', 'El nombre no es valido').escape().not().isEmpty(),
    searchErrors,
  ],
  departmentController.updateDepartment
);

export default router;
