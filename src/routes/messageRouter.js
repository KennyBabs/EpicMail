import express from 'express';
import bodyParser from 'body-parser';
import Message from '../controllers/messageController';
import Auth from '../middlewares/auth';
import MessageValidation from '../middlewares/validation';

const router = express.Router();

const { validMessage } = MessageValidation;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/messages', Auth.verifyToken, Message.getAllMessages);
router.get('/messages/unread', Auth.verifyToken, Message.getUnreadMessages);
router.get('/messages/sent', Auth.verifyToken, Message.getMessagesSent);
router.get('/messages/:id', Auth.verifyToken, Message.getAMessage);
router.delete('/messages/:id/retract', Auth.verifyToken, Message.retractAMessage);
router.delete('/messages/:id', Auth.verifyToken, Message.deleteAMessage);
router.post('/messages', Auth.verifyToken, validMessage, Message.createMessage);

export default router;