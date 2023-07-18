import CartRepository from '../repositories/CartRepository.js';

const getCartById = (cartId) => CartRepository.getCartById(cartId);
const createCart = () => CartRepository.createCart();
const addProductToCart = (cartId, productId, quantity) => CartRepository.addProductToCart(cartId, productId, quantity);
const removeProductFromCart = (cartId, productId) => CartRepository.removeProductFromCart(cartId, productId);
const updateCart = (cartId, totalPrice) => CartRepository.updateCart(cartId, totalPrice);
const updateProductInCart = (cartId, productId, quantity) => CartRepository.updateProductInCart(cartId, productId, quantity);
const deleteCart = (cartId) => CartRepository.deleteCart(cartId);

export default {
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductInCart,
  deleteCart
};
