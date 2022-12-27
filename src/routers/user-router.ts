import express from 'express';
const router = express.Router();
import userController from '../modules/users/users-controller';

router.get('/', userController.getAllUsers);

export default router;
