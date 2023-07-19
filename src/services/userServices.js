import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const registerUser = async (userNew) => {
    const hashedPassword = await bcrypt.hash(userNew.password, 10);
    userNew.password = hashedPassword;
    const user = new UserModel(userNew);
    await user.save();
    return user;
};

export const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
        throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect password');
    }
    return user;
};
export const togglePremium = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const user = await UserModel.findById(uid);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const requiredDocs = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        const uploadedDocs = user.documents.map(doc => doc.name);

        const hasRequiredDocs = requiredDocs.every(doc => uploadedDocs.includes(doc));

        if (!hasRequiredDocs) {
            return res.status(400).send('You must upload the required documents to become a premium user');
        }

        user.role = user.role === 'premium' ? 'user' : 'premium';
        await user.save();

        res.json({ message: `User ${user.role === 'premium' ? 'upgraded to' : 'downgraded from'} premium` });
    } catch (error) {
        next(error);
    }
};
