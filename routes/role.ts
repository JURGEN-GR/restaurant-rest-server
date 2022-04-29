import { Router } from 'express';
import * as roleController from '../controllers/role';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', roleController.addRole);
router.get('/', roleController.getRoles);
router.put('/:id', roleController.updateRole);

export default router;
