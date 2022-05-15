import { Router } from 'express';
import { check } from 'express-validator';
import * as uploadController from '../controllers/uploads';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

// Todas las validaciones de imagen se hacen en el controlador
router.post(
  '/user/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  uploadController.uploadImageUser
);
router.delete(
  '/user/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  uploadController.deleteImageUser
);

router.post(
  '/dish/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  uploadController.uploadImageDish
);
router.delete(
  '/dish/:id',
  check('id', 'El id no es valido').escape().isMongoId(),
  uploadController.deleteImageDish
);

export default router;
