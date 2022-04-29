import { Router } from 'express';
import * as departmentController from '../controllers/department';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', departmentController.addDepartment);
router.get('/', departmentController.getDepartments);
router.put('/:id', departmentController.updateDepartment);

export default router;
