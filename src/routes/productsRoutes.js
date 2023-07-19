
import { Router } from 'express';
import { ensureAdminOrPremium } from '../middlewares/auth.js';
import {
    getProductsController,
    getProductById,
    getProductByPid,
    addProduct,
    updateProduct,
    deleteProduct
  } from '../controllers/productsControllers.js';


const router = Router();

router.get('/', getProductsController);
router.get('/:id', getProductById);
router.get('/pid/:pid', getProductByPid);
// Solo el administrador puede crear, actualizar y eliminar productos.
router.post('/', ensureAdminOrPremium, addProduct);
router.put('/:pid', ensureAdminOrPremium, updateProduct);
router.delete('/:pid', ensureAdminOrPremium, deleteProduct);



export default router;
