import { Router } from 'express';
import * as roleController from '../controllers/role';
import { validateJwt } from '../middlewares/validate-jwt';
import { validationsAddRole, validationsUpdateRole } from '../validations/role';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', validationsAddRole, roleController.addRole);
router.get('/', roleController.getRoles);
router.put('/:id', validationsUpdateRole, roleController.updateRole);

export default router;
