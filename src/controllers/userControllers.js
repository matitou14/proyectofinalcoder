// userControllers.js
import * as userRepository from '../repositories/UsersRepository.js';
import passport from 'passport';


export const registerForm = (req, res) => {
    res.render('sessions/register');
};

export const register = async (req, res, next) => {
    try {
        const userNew = req.body;
        const user = await userRepository.createUser(userNew);
        res.redirect('/session/login');
    } catch (error) {
        next(error);
    }
};

export const loginForm = (req, res) => {
    res.render('sessions/login');
};

export const login = passport.authenticate('local', {
    successRedirect: '/api/products',
    failureRedirect: '/session/login',
    failureFlash: false
});

export const logout = (req, res) => {
  req.session.destroy(function (err) {
      res.redirect('/session/login');
  });
};

export const loginGithub = passport.authenticate('github', { scope: ['user:email'] });

export const loginGithubCallback = passport.authenticate('github', {
    failureRedirect: '/session/login'
}, (req, res) => {
    if (req.session) {
        req.session.user = req.user;
    }
    if (res) {
        res.redirect('/products');
    }
});

export const getCurrentUser = (req, res) => {
    const currentUser = req.user;
    res.json(currentUser);
};
