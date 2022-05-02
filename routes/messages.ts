import { Router } from 'express';
import * as messagesController from '../controllers/messages';

const router = Router();

router.post('/types', messagesController.addMessageType);
router.get('/types', messagesController.getMessageTypes);
router.put('/types/:id', messagesController.updateMessageType);
router.delete('/types/:id', messagesController.deleteMessageType);

router.get('/', messagesController.getMessages);
router.delete('/:id', messagesController.deleteMessage);

export default router;
