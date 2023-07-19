import express from 'express';
import { ensureUser } from '../middlewares/auth.js';
import cartController from '../controllers/cartControllers.js';

const router = express.Router();

router.get('/:cid', ensureUser, cartController.getCartById);
router.post('/', ensureUser, cartController.createCart);
router.post('/:cid/product/:pid', ensureUser, cartController.addProductToCart);
router.delete('/:cid/products/:pid', ensureUser, cartController.removeProductFromCart);
router.put('/:cid', ensureUser, cartController.updateCart);
router.put('/:cid/products/:pid', ensureUser, cartController.updateProductInCart);
router.delete('/:cid', ensureUser, cartController.deleteCart);
router.post('/:cid/purchase', ensureUser, cartController.purchaseCart);


export default router;

// Verificar que funcione el purchase del cart.,-
