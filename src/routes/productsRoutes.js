
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/auth.js';
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
router.post('/', ensureAdmin, addProduct);
router.put('/:pid', ensureAdmin, updateProduct);
router.delete('/:pid', ensureAdmin, deleteProduct);



export default router;
