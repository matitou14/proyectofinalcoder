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
