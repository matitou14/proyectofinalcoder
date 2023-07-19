export async function getCartById(req, res) {
  const cartId = req.params.cid;

  try {
    const cart = await cartServices.getCartById(cartId);
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

export async function createCart(req, res) {
  try {
    const cart = await cartServices.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
}

export async function addProductToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = await cartServices.addProductToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
}

export async function removeProductFromCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const updatedCart = await cartServices.removeProductFromCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
}

export async function updateCart(req, res) {
  const cartId = req.params.cid;
  const { totalPrice } = req.body;

  try {
    const updatedCart = await cartServices.updateCart(cartId, totalPrice);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
}

export async function updateProductInCart(req, res) {
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

export async function deleteCart(req, res) {
  const cartId = req.params.cid;

  try {
    await cartServices.deleteCart(cartId);
    res.json({ message: 'Carrito eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
}

export async function purchaseCart(req, res) {
  const cartId = req.params.cid;

  try {
    const purchasedCart = await cartServices.purchaseCart(cartId);
    res.render('checkout', { ticket: purchasedCart.ticket, productsNotPurchased: purchasedCart.productsNotPurchased });
  } catch (error) {
    res.status(500).json({ error: 'Error al finalizar la compra del carrito' });
  }
}
