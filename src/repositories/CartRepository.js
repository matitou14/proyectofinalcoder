import CartDAO from '../dao/CartDAO.js';

class CartRepository {
  static getCartById(cartId) {
    return CartDAO.getCartById(cartId);
  }

  static createCart() {
    return CartDAO.createCart();
  }

  static addProductToCart(cartId, productId, quantity = 1) {
    return CartDAO.addProductToCart(cartId, productId, quantity);
  }

  static removeProductFromCart(cartId, productId) {
    return CartDAO.removeProductFromCart(cartId, productId);
  }

  static updateCart(cartId, totalPrice) {
    return CartDAO.updateCart(cartId, totalPrice);
  }

  static updateProductInCart(cartId, productId, quantity) {
    return CartDAO.updateProductInCart(cartId, productId, quantity);
  }

  static deleteCart(cartId) {
    return CartDAO.deleteCart(cartId);
  }
}

export default CartRepository;
