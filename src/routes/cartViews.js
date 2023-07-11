import express from 'express';
import cartController from '../controllers/cartControllers.js';

const router = express.Router();

// Vista de un carrito específico
router.get('/:cid', cartController.getCartById);

export default router;
