import express from 'express';
import userController from '../controllers/users.controller';
import validateForm from '../middlewares/users.validation';
import rateLimiter from '../middlewares/rateLimiter';

const router = express.Router();

router.route('/signIn').get(userController.getUser).post(validateForm, rateLimiter, userController.signIn);

router.post('/signUp', validateForm, rateLimiter, userController.signUp);

export default router;