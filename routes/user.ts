import { Router } from 'express';
import * as userController from '../controllers/user';
import { validateJwt } from '../middlewares/validate-jwt';
import { validationsAddUser, validationsUpdateUser } from '../validations/user';

const router = Router();

router.post('/', validationsAddUser, userController.addUser);

// validar token en todas las rutas
router.use(validateJwt);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', validationsUpdateUser, userController.updateUser);

export default router;
