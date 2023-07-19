import express from 'express';
import { ensureUser } from '../middlewares/auth.js';
import { getCartById, createCart, addProductToCart, removeProductFromCart, updateCart, updateProductInCart, deleteCart, purchaseCart } from '../controllers/cartControllers.js';

const router = express.Router();

router.get('/:cid', ensureUser, getCartById);
router.post('/', ensureUser, createCart);
router.post('/:cid/product/:pid', /*ensureUser*/ addProductToCart);
router.delete('/:cid/products/:pid', ensureUser, removeProductFromCart);
router.put('/:cid', ensureUser, updateCart);
router.put('/:cid/products/:pid', ensureUser, updateProductInCart);
router.delete('/:cid', ensureUser, deleteCart);
router.post('/:cid/purchase', ensureUser, purchaseCart);

export default router;
