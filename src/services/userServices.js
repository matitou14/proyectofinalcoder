import UserModel from '../models/userModel.js';
import { encryptPassword, comparePassword } from '../utils.js'

export const showRegisterForm = (req, res) => {
    res.render('register');
};

export const registerUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const user = await userService.registerUser(first_name, last_name, email, age, password);
        res.redirect('/session/login');
    } catch (error) {
        next(error);
    }
};