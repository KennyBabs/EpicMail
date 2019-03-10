import express from 'express';

import messageController from '../controller/messageController';
import bodyParser from 'body-parser';


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//router.get('/api/v1/messages', messageController.getAllMessages);


export default router;