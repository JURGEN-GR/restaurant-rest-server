import { Router } from 'express';
import * as dishController from '../controllers/dish';

const router = Router();

router.post('/', dishController.addDish);
router.get('/', dishController.getDishes);
router.put('/:id', dishController.updateDish);

export default router;
