import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import Repository from './Repository.js';
import User from '../models/userModel.js';

// export const registerUser = async (userNew) => {
//     const hashedPassword = await bcrypt.hash(userNew.password, 10);
//     userNew.password = hashedPassword;
//     const user = new UserModel(userNew);
//     await user.save();
//     return user;
// };

// export const loginUser = async (email, password) => {
//     const user = await UserModel.findOne({ email }).exec();
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//         throw new Error('Incorrect password');
//     }
//     return user;
// };

export default class UserService extends Repository {
    constructor(dao) {
        super(dao, User)
    }
}
