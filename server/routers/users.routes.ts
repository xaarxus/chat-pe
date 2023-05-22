import express from 'express';
import userController from '../controllers/users.controller';

const router = express.Router();

router.post('/signIn', userController.signIn)

export default router;