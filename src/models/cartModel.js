import mongoose from 'mongoose';

export default class Cart {
  static get model() {
    return 'carts';
  }

  static get schema() {
    return {
      products: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, default: 1 },
        },
      ],
    };
  }
}

const CartModel = mongoose.model(Cart.model, new mongoose.Schema(Cart.schema));

export { CartModel };
