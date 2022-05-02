import { Router } from 'express';
import * as restaurantController from '../controllers/restaurant';
import { validateJwt } from '../middlewares/validate-jwt';
import {
  validationsAddRestaurant,
  validationsUpdateRestaurant,
} from '../validations/restaurant';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', validationsAddRestaurant, restaurantController.addRestaurant);
router.get('/', restaurantController.getRestaurants);
router.put(
  '/:id',
  validationsUpdateRestaurant,
  restaurantController.updateRestaurant
);

export default router;
