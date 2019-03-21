import express from 'express';
import bodyParser from 'body-parser';
import Group from '../controllers/groupController';
import Auth from '../middlewares/auth';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/groups', Auth.verifyToken, Group.createGroup);
router.delete('/groups/:id', Auth.verifyToken, Group.deleteAGroup);
router.delete('/groups/:group/user/:user', Auth.verifyToken, Group.deleteUserInAGroup);

export default router;