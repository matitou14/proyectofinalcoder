import express from 'express';
import * as userController from '../controllers/userControllers.js';

const router = express.Router();

router.get('/session/login', userController.showLoginForm);
router.post('/session/login', userController.loginUser);
router.post('/session/logout', userController.logoutUser);


export default router;