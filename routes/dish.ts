import { Router } from 'express';
import * as dishController from '../controllers/dish';
import { validateJwt } from '../middlewares/validate-jwt';
import { validationsAddDish, validationsUpdateDish } from '../validations/dish';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', validationsAddDish, dishController.addDish);
router.get('/', dishController.getDishes);
router.put('/:id', validationsUpdateDish, dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

export default router;
