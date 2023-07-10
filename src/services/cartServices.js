import Cart from '../models/cartModel.js';

// Obtener el carrito de un usuario
async function getCartByUserId(userId) {
  return await Cart.findOne({ userId }).populate('products');
}

// Crear un nuevo carrito
async function createCart() {
  return await Cart.create({});
}

// Agregar un producto al carrito
async function addProductToCart(userId, productId) {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    const newCart = new Cart({
      userId,
      products: [productId]
    });
    await newCart.save();
  } else {
    if (!cart.products.includes(productId)) {
      cart.products.push(productId);
      await cart.save();
    }
  }
}

// Eliminar un producto del carrito
async function removeProductFromCart(userId, productId) {
  const cart = await Cart.findOne({ userId });

  if (cart && cart.products.includes(productId)) {
    cart.products = cart.products.filter((id) => id.toString() !== productId);
    await cart.save();
  }
}
// Actualizar un carrito por su ID
async function updateCart(cartId, totalPrice) {
    return await Cart.findByIdAndUpdate(cartId, { totalPrice }, { new: true });
  }
  
  // Actualizar un producto en el carrito
  async function updateProductInCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const productIndex = cart.products.findIndex((product) => product._id.toString() === productId);
  
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    }
  }
  
  // Eliminar un carrito por su ID
  async function deleteCart(cartId) {
    await Cart.findByIdAndDelete(cartId);
  }

export default {
  getCartByUserId,
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductInCart,
  deleteCart
};
