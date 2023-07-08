import productService from '../services/productsServices.js';

const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
//   res.json(products);
res.render('products', { products: products.map(prod => prod.toObject()) });
};

const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.json(product);
};

const getProductByPid = async (req, res) => {
  const product = await productService.getProductByPid(req.params.pid);
  res.json(product);
};

const addProduct = async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.json(newProduct);
};

const updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const deletedProduct = await productService.deleteProduct(req.params.pid);
  res.json(deletedProduct);
};

export default {
  getProducts,
  getProductById,
  getProductByPid,
  addProduct,
  updateProduct,
  deleteProduct,
};
