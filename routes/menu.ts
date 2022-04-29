import { Router } from 'express';
import * as menuController from '../controllers/menu';

const router = Router();

router.post('/', menuController.addMenu);
router.get('/', menuController.getMenus);
router.put('/:id', menuController.updateMenu);

export default router;
