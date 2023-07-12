import express from 'express';
import  { loginGithub, loginGithubCallback, getCurrentUser } from '../controllers/userControllers.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import passport from 'passport';

const router = express.Router();

// Vista para crear usuarios
router.get('/register',(req, res) => {
    res.render('sessions/register')
} )


//API para crear usuarios
router.post('/register', async (req, res) => {
    const userNew = req.body
    const hashedPassword = await bcrypt.hash(userNew.password, 10);
    userNew.password = hashedPassword;
    const user = new UserModel(userNew)
    await user.save()
   
    res.redirect('/session/login')
});

//Vista de login
router.get('/login',(req,res) =>{(
    res.render('sessions/login')
)}),


// API de login

router.post('/login', passport.authenticate('local', {
    successRedirect: '/api/products',
    failureRedirect: '/session/login',
    failureFlash: true
  }), (req, res) => { if (req.user.email === 'adminCoder@coder.com') {
    req.user.role = 'admin';
  } else {
    req.user.role = 'usuario';
  }
});

//CERRAR LA SESION

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/session/login');
  });


router.get('/github', loginGithub);
router.get('/githubcallback', loginGithubCallback);
router.get('/current', getCurrentUser);


export default router;