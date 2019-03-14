import express from 'express';

import messageController from '../controller/messageController';
import userController from '../controller/userController';
import bodyParser from 'body-parser';

import { signUpValidator, signInValidator } from '../middleware/middleware';


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//=======Message Endpoints=========================
router.get('/messages', messageController.getAllMessages);
router.get('/messages/unread', messageController.getAllMessages);
router.get('/messages/sent', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessage);
router.post('/messages', messageController.createMessages);
router.delete('/messages/:id', messageController.deleteMessage);

//==========User Endpoints==========================
router.post('/auth/signup', signUpValidator, userController.createUser);
router.post('/auth/login', signInValidator, userController.loginUser);





export default router;