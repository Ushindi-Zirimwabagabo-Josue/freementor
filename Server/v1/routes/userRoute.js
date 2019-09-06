import express from 'express';
import userController from '../controllers/userController';
import userValidations from '../helpers/userValidation';

const router = express.Router();

const { validateSignup, validateSignin } = userValidations;

router.post('/signup', validateSignup, userController.signup);

export default router;
