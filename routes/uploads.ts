import { Router } from 'express';
import * as uploadController from '../controllers/uploads';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

// Todas las validaciones de imagen se hacen en el controlador
router.post('/user/:id', uploadController.uploadImageUser);
router.delete('/user/:id', uploadController.deleteImageUser);

router.post('/dish/:id', uploadController.uploadImageDish);
router.delete('/dish/:id', uploadController.deleteImageDish);

export default router;
