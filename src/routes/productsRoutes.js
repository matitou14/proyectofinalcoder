
import { Router } from 'express';
import productController from '../controllers/productsControllers.js';

const router = Router();

router.get('/', productController.getProductsController);
router.get('/:id', productController.getProductById);
router.get('/pid/:pid', productController.getProductByPid);
router.post('/', productController.addProduct);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

export default router;
