import { Router } from 'express';
import * as screenController from '../controllers/screen';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post('/', screenController.addScreen);
router.get('/', screenController.getScreens);

export default router;
