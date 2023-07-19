// userControllers.js
import * as userRepository from '../repositories/UsersRepository.js';
import * as userService from '../services/userServices.js';
import passport from 'passport';
import nodemailer from 'nodemailer';
import moment from 'moment';
import UserModel from '../models/userModel.js'; 

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

export const login = (req, res, next) => {
    userService.loginUser(req.body.email, req.body.password)
        .then((user) => {
            if (req.session) {
              req.session.user = user;  // Guarda el usuario en la sesión
            }
            return UserModel.findByIdAndUpdate(user._id, { last_connection: new Date() })
        })
        .then(() => res.redirect('/api/products'))
        .catch(err => next(err));
  };

export const logout = (req, res) => {
    // Comprobar si req.session.user está definido
    if (req.session && req.session.user) {
      // Actualizar la última conexión del usuario
      UserModel.findByIdAndUpdate(req.session.user._id, { last_connection: new Date() }, (err) => {
        if (err) console.log(err);
      });
  
      req.session.destroy(function (err) {
        res.redirect('/session/login');
      });
    } else {
      res.status(400).json({ error: 'Usuario no autenticado' });
    }
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


export const togglePremium = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const user = await userService.togglePremium(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const uploadDocuments = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const documents = req.files.map(file => ({
            name: file.originalname,
            reference: '/uploads/documents/' + file.filename
        }));

        const user = await UserModel.findById(uid);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.documents.push(...documents);
        await user.save();

        res.json({ message: 'Documents uploaded successfully', documents });
    } catch (error) {
        next(error);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, 'name email role');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const removeInactiveUsers = async (req, res, next) => {
    try {
        const twoDaysAgo = moment().subtract(2, 'days').toDate();

        const inactiveUsers = await UserModel.find({ last_connection: { $lt: twoDaysAgo } });

        for (const user of inactiveUsers) {
            // TODO: Send an email to the user
            await UserModel.findByIdAndDelete(user._id);
        }

        res.json({ message: `${inactiveUsers.length} users removed` });
    } catch (error) {
        next(error);
    }
};export const adminView = (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        // maneja el error
      } else {
        res.render('admin', { users });
      }
    });
  };