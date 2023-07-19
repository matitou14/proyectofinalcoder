import express from 'express';
import { getProductsController, getProductById } from '../controllers/productsControllers.js';
import { getCartById, purchaseCart } from '../controllers/cartControllers.js';

const router = express.Router();

// Para mostrar la lista de productos
router.get('/products', getProductsController);

// Para mostrar el detalle de un producto específico
router.get('/products/:id', getProductById);

// Para mostrar el carrito
router.get('/cart/:cid', getCartById);  // Asegúrate de que estás pasando un ID de carrito aquí

// Para realizar el checkout
router.get('/checkout/:cid', purchaseCart); // Asegúrate de que estás pasando un ID de carrito aquí

export default router;
