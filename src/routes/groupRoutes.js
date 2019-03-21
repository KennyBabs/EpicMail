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
router.get('/groups', Auth.verifyToken, Group.getAllGroups);
router.post('/groups/:id/users', Auth.verifyToken, Group.addUserToGroup);

export default router;