import passport from 'passport';
import { userService } from '../services/service.js';
import { UserDTO } from '../dto/UserDTO.js';

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    registerForm = (req, res) => {
        res.render('sessions/register');
    }

    register = async (req, res, next) => {
        try {
            const userNew = req.body;
            const user = await this.userService.save(userNew);
            res.redirect('/session/login');
        } catch (error) {
            next(error);
        }
    }

    loginForm = (req, res) => {
        res.render('sessions/login');
    }

    login = passport.authenticate('local', {
        successRedirect: '/api/products',
        failureRedirect: '/session/login',
        failureFlash: false
    })

    logout = (req, res) => {
        req.session.destroy(function (err) {
            res.redirect('/session/login');
        })
    }

    loginGithub = passport.authenticate('github', { scope: ['user:email'] });

    loginGithubCallback = passport.authenticate('github', {
        failureRedirect: '/session/login'
    }, (req, res) => {
        if (req.session) {
            req.session.user = req.user;
        }
        if (res) {
            res.redirect('/products');
        }
    })

    getCurrentUser = async (req, res) => {
        try {
            const user = await this.userService.get(req.session.userId);
            if (user) {
                res.status(200).json(new UserDTO(user));
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController(userService);
