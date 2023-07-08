import express from 'express';
const router = express.Router();

// Ruta para visualizar un carrito específico y sus productos
router.get('/:cid', async (req, res) => {
    
  res.render('cart', { cart });
});

export default router;
