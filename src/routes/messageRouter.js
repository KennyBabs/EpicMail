import express from 'express';
import bodyParser from 'body-parser';
import Message from '../controllers/messageController';
// import Auth from '../middlewares/auth';
import MessageValidation from '../middlewares/validation';

const router = express.Router();

const { validMessage } = MessageValidation;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/messages', Message.getAllMessages);
router.get('/messages/unread', Message.getUnreadMessages);
router.get('/messages/sent', Message.getMessagesSent);
router.get('/messages/:id', Message.getAMessage);
router.delete('/messages/:id/retract', Message.retractAMessage);
router.delete('/messages/:id', Message.deleteAMessage);
router.post('/messages', validMessage, Message.createMessage);

export default router;