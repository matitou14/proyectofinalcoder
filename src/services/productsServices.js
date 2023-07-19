import * as productsRepository from '../repositories/productRepository.js';

export const getProducts = async (limit, page, sort, query) => {
  return await productsRepository.getProducts(limit, page, sort, query);
};

export const getProductById = async (productId) => {
  return await productsRepository.getProductById(productId);
};

export const getProductByPid = async (pid) => {
  return await productsRepository.getProductByPid(pid);
};

export const createProduct = async (productData) => {
  return await productsRepository.createProduct(productData);
};

export const updateProduct = async (pid, productData) => {
  return await productsRepository.updateProduct(pid, productData);
};

export const deleteProduct = async (pid) => {
  return await productsRepository.deleteProduct(pid);
};
export const verifyStockAndReduceInventory = async (productData) => {
  const { productId, quantity } = productData;
  const product = await ProductRepository.getProductById(productId);

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  if (product.stock < quantity) {
    throw new Error(`No hay suficiente stock para el producto ${product._id}`);
  }

  // Restar la cantidad del stock disponible
  product.stock -= quantity;
  await ProductRepository.updateProduct(productId, product);

  return product;
}