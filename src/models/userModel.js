import mongoose from 'mongoose';

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
      },
      role: {
        type: String,
        enum: ['admin', 'premium', 'regular'],
        default: 'regular'
      }
      
});


mongoose.set('strictQuery', false)
const UserModel = mongoose.model(userCollection, userSchema);

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

export default UserModel;

