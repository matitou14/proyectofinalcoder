import CartRepository from '../repositories/CartRepository.js';
import { createTicket } from '../services/ticketServices.js';
import * as productService from '../services/productsServices.js';


const getCartById = (cartId) => CartRepository.getCartById(cartId);
const createCart = () => CartRepository.createCart();
const addProductToCart = (cartId, productId, quantity) => CartRepository.addProductToCart(cartId, productId, quantity);
const removeProductFromCart = (cartId, productId) => CartRepository.removeProductFromCart(cartId, productId);
const updateCart = (cartId, totalPrice) => CartRepository.updateCart(cartId, totalPrice);
const updateProductInCart = (cartId, productId, quantity) => CartRepository.updateProductInCart(cartId, productId, quantity);
const deleteCart = (cartId) => CartRepository.deleteCart(cartId);

async function purchaseCart(cartId) {
  const cart = await CartRepository.getCartById(cartId);

  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  // Verificar disponibilidad de stock y generar el ticket
  const ticketData = {
    code: generateTicketCode(), // Generar un código único para el ticket
    purchase_datetime: new Date(),
    amount: cart.totalPrice,
    purchaser: cart.user,
    products: []
  };

  const productsNotPurchased = []; // Almacenar los IDs de los productos no comprados

  // Procesar cada producto en el carrito
  for (const product of cart.products) {
    const productData = {
      productId: product.product._id,
      quantity: product.quantity
    };

    try {
      // Verificar disponibilidad de stock y restar del inventario
      await ProductService.verifyStockAndReduceInventory(productData);

      // Agregar el producto al ticket
      ticketData.products.push(productData);
    } catch (error) {
      // El producto no pudo ser comprado, agregar su ID al arreglo
      productsNotPurchased.push(product.product._id);
    }
  }

  // Generar el ticket con los datos de la compra
  const ticket = await TicketService.createTicket(ticketData);

  // Actualizar el carrito con los productos no comprados
  const productsPurchasedIds = ticketData.products.map(product => product.productId);
  cart.products = cart.products.filter(product => !productsPurchasedIds.includes(product.product._id));
  await CartRepository.updateCart(cartId, cart.totalPrice, cart.products);

  return {
    ticket,
    productsNotPurchased
  };
}


export default {
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductInCart,
  deleteCart,
  purchaseCart
};
