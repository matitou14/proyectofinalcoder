import Cart from '../models/cartModel.js';

class CartDAO {
  static async getCartById(cartId) {
    try {
      return await Cart.findById(cartId).populate('products.product');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async createCart() {
    try {
      const newCart = await Cart.create({});
      return newCart;
    } catch (err) {
      console.error('Error al crear el carrito:', err);
      throw err;
    }
  }

  static async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);

      if (!cart) {
        const newCart = new Cart({ _id: cartId, products: [{ product: productId, quantity }] });
        await newCart.save();
        return newCart;
      }

      const productInCart = cart.products.find(item => item.product.toString() === productId);

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      if (cart) {
        cart.products = cart.products.filter(item => item.product.toString() !== productId);
        await cart.save();
        return cart;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateCart(cartId, totalPrice) {
    try {
      return await Cart.findByIdAndUpdate(cartId, { totalPrice }, { new: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async updateProductInCart(cartId, productId, quantity) {
    try {
      const cart = await this.getCartById(cartId);
      if (cart) {
        const productInCart = cart.products.find(item => item.product.toString() === productId);
        if (productInCart) {
          productInCart.quantity = quantity;
          await cart.save();
          return cart;
        }
      }
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async deleteCart(cartId) {
    try {
      return await Cart.findByIdAndDelete(cartId);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default CartDAO;
