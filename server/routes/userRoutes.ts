import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/users/:id', userController.getUserById);
router.post('/login', userController.login);
router.post('/signin', userController.register);
router.put('/user/update', userController.updateProfile);
router.put('/user/lastLogin', userController.lastLogin);
router.get('/user/profilePic/:username', userController.getProfilePic);

export default router;
