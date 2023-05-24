import express from 'express';
import userController from '../controllers/users.controller';

const router = express.Router();

router.route('/signIn')
  .get(userController.getUser)
  .post(userController.signIn);

router.post('/signUp', userController.signUp);

export default router;