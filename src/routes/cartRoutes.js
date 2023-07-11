import express from 'express';
import cartController from '../controllers/cartControllers.js';

const router = express.Router();

router.get('/:cid', cartController.getCartById);
router.post('/', cartController.createCart);
router.post('/:cid/product/:pid', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductInCart);
router.delete('/:cid', cartController.deleteCart);

export default router;
