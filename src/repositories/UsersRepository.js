
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const getUserById = async (id) => {
    return await UserModel.findById(id);
};

export const getUserByEmail = async (email) => {
    return await UserModel.findOne({ email }).exec();
};

export const createUser = async (userNew) => {
    const hashedPassword = await bcrypt.hash(userNew.password, 10);
    userNew.password = hashedPassword;
    const user = new UserModel(userNew);
    await user.save();
    return user;
};

export const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }
    return user;
};
