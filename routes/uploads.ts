import { Router } from 'express';
import * as uploadController from '../controllers/uploads';

const router = Router();

router.post('/user/:id', uploadController.uploadImageUser);
router.delete('/user/:id', uploadController.deleteImageUser);

router.post('/dish/:id', uploadController.uploadImageDish);
router.delete('/dish/:id', uploadController.deleteImageDish);

export default router;
