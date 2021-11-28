import express from 'express';
const router = express.Router();
import userController from '../controllers/user-controller';
import authorize from '../../middlewares/auth-middleware';
import authorizeAdmin from '../../middlewares/auth-admin-middleware';

router.get('/', authorizeAdmin, userController.getAllUsers);
router.get('/:id', authorize, userController.getUserById);
router.patch('/:id', authorize, userController.updateUser);

module.exports = router;
