import express from 'express';
import * as userController from '../controllers/userControllers.js';
import {ensureAdminOrPremium }from '../middlewares/auth.js'; 
import upload from '../middlewares/multer.js';

const { 
    registerForm, 
    register, 
    loginForm, 
    login, 
    logout, 
    loginGithub, 
    loginGithubCallback, 
    getCurrentUser, 
    togglePremium // Importa el controlador togglePremium
} = userController;

const router = express.Router();

router.get('/register', registerForm);
router.post('/register', register);

router.get('/login', loginForm);
router.post('/login', login);

router.post('/logout', logout);

router.get('/github', loginGithub);
router.get('/githubcallback', loginGithubCallback);
router.get('/current', getCurrentUser);
router.put('/premium/:uid', ensureAdminOrPremium, togglePremium);
router.post('/:uid/documents', upload.array('documents'), userController.uploadDocuments);
router.get('/', ensureAdminOrPremium, userController.getAllUsers);
router.delete('/', ensureAdminOrPremium, userController.removeInactiveUsers);
router.get('/admin', ensureAdminOrPremium, userController.adminView);


export default router;
