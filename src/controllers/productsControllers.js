// productsController.js
import * as productRepository from '../repositories/productRepository.js';

const getProductsController = async (req, res) => {
  try {
    const user = req.session.user;
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productRepository.getProducts(limit, page, sort, query);

    const totalPages = result.totalPages;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const currentPage = result.page;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

    res.render('products', {
      products: result.products,
      user: user,
      totalPages,
      prevPage,
      nextPage,
      currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productRepository.getProductById(productId);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const getProductByPid = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productRepository.getProductByPid(pid);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await productRepository.createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = await productRepository.updateProduct(pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await productRepository.deleteProduct(pid);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

export default {
  getProductsController,
  getProductById,
  getProductByPid,
  addProduct,
  updateProduct,
  deleteProduct,
};
