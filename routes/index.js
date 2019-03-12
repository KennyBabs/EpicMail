import express from 'express';

import messageController from '../controller/messageController';
import userController from '../controller/userController';
import bodyParser from 'body-parser';


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//=======Message Endpoints=========================
router.get('/api/v1/messages', messageController.getAllMessages);
router.get('/api/v1/messages/unread', messageController.getAllMessages);
router.get('/api/v1/messages/sent', messageController.getAllMessages);
router.get('/api/v1/messages/:id', messageController.getMessage);
router.post('/api/v1/messages', messageController.createMessages);
router.delete('/api/v1/messages/:id', messageController.deleteMessage);

//==========User Endpoints==========================
router.post('/api/v1/auth/signup', userController.createUser);




export default router;