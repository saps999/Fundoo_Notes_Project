import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to register a new user
router.post('/', newUserValidator, userController.signup);

//route to login
router.post('/login',  userController.login);




export default router;
