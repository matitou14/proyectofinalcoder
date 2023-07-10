import cartServices from '../services/cartServices.js';

// Obtener el carrito por ID
async function getCartById(req, res) {
    const cartId = req.params.cid;
  
    try {
      const cart = await cartServices.getCartById(cartId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
  }
  
  // Crear un nuevo carrito
  async function createCart(req, res) {
    try {
      const cart = await cartServices.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  }

// Agregar un producto al carrito
async function addProductToCart(req, res) {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    await cartServices.addProductToCart(userId, productId);
    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

// Eliminar un producto del carrito
async function removeProductFromCart(req, res) {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    await cartServices.removeProductFromCart(userId, productId);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
}

// Actualizar un carrito por su ID
async function updateCart(req, res) {
    const cartId = req.params.cid;
    const { totalPrice } = req.body;
  
    try {
      const cart = await cartServices.updateCart(cartId, totalPrice);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
  }
  
  // Actualizar un producto en el carrito
  async function updateProductInCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
  
    try {
      await cartServices.updateProductInCart(cartId, productId, quantity);
      res.json({ message: 'Producto actualizado en el carrito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto en el carrito' });
    }
  }
  
  // Eliminar un carrito por su ID
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
