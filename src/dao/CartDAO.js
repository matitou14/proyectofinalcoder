import Cart from '../models/cartModel.js';

class CartDAO {
  static async getCartById(cartId) {
    return await Cart.findById(cartId).populate('products.product');
  }

  static async createCart() {
    return await Cart.create({});
  }

  static async addProductToCart(cartId, productId, quantity = 1) {
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
  }

  static async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (cart) {
      cart.products = cart.products.filter(item => item.product.toString() !== productId);
      await cart.save();
      return cart;
    }
    return null;
  }

  static async updateCart(cartId, totalPrice) {
    return await Cart.findByIdAndUpdate(cartId, { totalPrice }, { new: true });
  }

  static async updateProductInCart(cartId, productId, quantity) {
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
  }

  static async deleteCart(cartId) {
    return await Cart.findByIdAndDelete(cartId);
  }
}

export default CartDAO;
