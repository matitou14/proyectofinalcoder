import cartServices from '../services/cartServices.js';

async function getCartById(req, res) {
  const cartId = req.params.cid;

  try {
    const cart = await cartServices.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

async function createCart(req, res) {
  try {
    const cart = await cartServices.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
}

async function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = await cartServices.addProductToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

async function removeProductFromCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = await cartServices.removeProductFromCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
}

async function updateCart(req, res) {
  const cartId = req.params.cid;
  const { totalPrice } = req.body;

  try {
    const updatedCart = await cartServices.updateCart(cartId, totalPrice);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
}

async function updateProductInCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const updatedCart = await cartServices.updateProductInCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto en el carrito' });
  }
}

async function deleteCart(req, res) {
  const cartId = req.params.cid;

  try {
    await cartServices.deleteCart(cartId);
    res.json({ message: 'Carrito eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
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
