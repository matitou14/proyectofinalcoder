import { ProductModel } from '../models/productsModel.js';

const getProducts = async (limit, page, sort, query) => {
  const filter = query ? { name: { $regex: query, $options: 'i' } } : {};

  const options = {
    limit: limit,
    page: page,
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
  };

  const paginatedResults = await ProductModel.paginate(filter, options);

  const result = {
    products: paginatedResults.docs,
    totalPages: paginatedResults.totalPages,
    prevPage: paginatedResults.prevPage,
    nextPage: paginatedResults.nextPage,
    page: paginatedResults.page,
    hasPrevPage: paginatedResults.hasPrevPage,
    hasNextPage: paginatedResults.hasNextPage
  };

  return result;
};

const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

const getProductByPid = async (pid) => {
  return await ProductModel.findOne({ pid });
};

const createProduct = async (productData) => {
  return await ProductModel.create(productData);
};

const updateProduct = async (pid, productData) => {
  return await ProductModel.findOneAndUpdate({ pid }, productData, { new: true });
};

const deleteProduct = async (pid) => {
  return await ProductModel.findOneAndDelete({ pid });
};

export default {
  getProducts,
  getProductById,
  getProductByPid,
  createProduct,
  updateProduct,
  deleteProduct,
};
