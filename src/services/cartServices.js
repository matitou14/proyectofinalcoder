import Cart from '../models/cartModel.js';

async function getCartById(cartId) {
  return await Cart.findById(cartId).populate('products');
}

async function createCart() {
  return await Cart.create({});
}

async function addProductToCart(cartId, productId) {
  const cart = await Cart.findById(cartId);

  if (!cart) {
    const newCart = new Cart({
      _id: cartId,
      products: [{ _id: productId }]
    });
    await newCart.save();
  } else {
    if (!cart.products.some((product) => product._id.toString() === productId)) {
      cart.products.push({ _id: productId });
      await cart.save();
    }
  }
}

async function removeProductFromCart(cartId, productId) {
  const cart = await Cart.findById(cartId);

  if (cart) {
    cart.products = cart.products.filter((product) => product._id.toString() !== productId);
    await cart.save();
  }
}

async function updateCart(cartId, totalPrice) {
  return await Cart.findByIdAndUpdate(cartId, { totalPrice }, { new: true });
}

async function updateProductInCart(cartId, productId, quantity) {
  const cart = await Cart.findById(cartId);
  const product = cart.products.find((product) => product._id.toString() === productId);

  if (product) {
    product.quantity = quantity;
    await cart.save();
  }
}

async function deleteCart(cartId) {
  await Cart.findByIdAndDelete(cartId);
}

export default {
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductInCart,
  deleteCart
};
