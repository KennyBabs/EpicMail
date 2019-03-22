import express from 'express';
import bodyParser from 'body-parser';
import User from '../controllers/usersController';
import UserValidation from '../middlewares/validation';



const router = express.Router();
const { validSignUp, validLogin} = UserValidation;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/auth/signup', validSignUp, User.signUpUser);
router.post('/auth/login', validLogin,  User.loginUser);

export default router;
