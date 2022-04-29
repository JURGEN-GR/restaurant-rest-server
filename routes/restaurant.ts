import { Router } from 'express';
import * as restaurantController from '../controllers/restaurant';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', restaurantController.addRestaurant);
router.get('/', restaurantController.getRestaurants);
router.put('/:id', restaurantController.updateRestaurant);

export default router;
