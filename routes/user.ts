import { Router } from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/user';
import { validateJwt } from '../middlewares/validate-jwt';
import { validationsAddUser, validationsUpdateUser } from '../validations/user';

const router = Router();

router.post('/', validationsAddUser, userController.addUser);

// validar token en todas las rutas
router.use(validateJwt);

router.get('/', userController.getUsers);
router.get(
  '/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  userController.getUser
);
router.put('/:id', validationsUpdateUser, userController.updateUser);
router.delete(
  '/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  userController.deleteUser
);

export default router;
