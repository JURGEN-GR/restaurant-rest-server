import { Router } from 'express';
import * as dishController from '../controllers/dish';

const router = Router();

router.post('/', dishController.addDish);
router.get('/', dishController.getDishes);

export default router;
