import express from 'express';
import * as userController from '../controllers/userControllers.js';

const router = express.Router();

router.get('/register', userController.registerForm);
router.post('/register', userController.register);

router.get('/login', userController.loginForm);
router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/github', userController.loginGithub);
router.get('/githubcallback', userController.loginGithubCallback);
router.get('/current', userController.getCurrentUser);

export default router;
