import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export default class User {
  static get model() {
    return 'users';
  }

  static get schema() {
    return {
      first_name: String,
      last_name: String,
      email: String,
      age: Number,
      password: String,
      cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
      },
      role: {
        type: String,
        enum: ['admin', 'premium', 'user'],
        default: 'user'
      }
    };
  }

  // Agrega un método para verificar la contraseña del usuario
  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

const UserModel = mongoose.model(User.model, new mongoose.Schema(User.schema));

export { UserModel };
