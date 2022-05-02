import { Router } from 'express';
import { check } from 'express-validator';
import * as messagesController from '../controllers/messages';
import { searchErrors } from '../middlewares/search-errors';
import { validateJwt } from '../middlewares/validate-jwt';

const router = Router();

// validar token en todas las rutas
router.use(validateJwt);

router.post(
  '/types',
  [
    check('name', 'El nombre no es valido').escape().not().isEmpty(),
    searchErrors,
  ],
  messagesController.addMessageType
);
router.get('/types', messagesController.getMessageTypes);

router.put(
  '/types/:id',
  [
    check('name', 'El nombre no es valido').escape().not().isEmpty(),
    searchErrors,
  ],
  messagesController.updateMessageType
);
router.delete('/types/:id', messagesController.deleteMessageType);

router.get('/', messagesController.getMessages);
router.delete('/:id', messagesController.deleteMessage);

export default router;
