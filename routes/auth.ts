import { Router } from 'express';
import * as authController from '../controllers/auth';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

router.post('/login', authController.login);
router.post('/renew', validateJwt, authController.revalidateToken);

export default router;
