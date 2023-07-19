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
        ref: 'Cart',
      },
      role: {
        type: String,
        enum: ["admin", "premium", "user"],
        default: "user"
      },
      documents: [{
        name: String,
        reference: String
    }],
    last_connection: {
        type: Date,
        default: null
    }
});


mongoose.set('strictQuery', false)
const UserModel = mongoose.model(userCollection, userSchema);

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  }; 

export default UserModel;

