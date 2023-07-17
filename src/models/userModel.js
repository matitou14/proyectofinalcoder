import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

class User {
  static get model() {
    return 'users';
  }

  static get schema() {
    return new mongoose.Schema({
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
    }, { timestamps: true });
  }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

let UserModel;
if (mongoose.models[User.model]) {
  UserModel = mongoose.model(User.model);
} else {
  UserModel = mongoose.model(User.model, User.schema);
}

export default UserModel;
