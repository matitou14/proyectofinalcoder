import Product from '../models/productsModel.js';

const getProducts = async (limit, page, sort, query) => {
  const filter = query ? { name: { $regex: query, $options: 'i' } } : {};

  const options = {
    limit: limit,
    page: page,
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
  };

  const paginatedResults = await Product.paginate(filter, options);

  const result = {
    products: paginatedResults.results,
    totalPages: paginatedResults.pageCount,
    prevPage: paginatedResults.previous ? paginatedResults.previous : null,
    nextPage: paginatedResults.next ? paginatedResults.next : null,
    page: paginatedResults.page,
    hasPrevPage: paginatedResults.hasPreviousPages,
    hasNextPage: paginatedResults.hasNextPages
  };

  return result;
};

const getProductById = async (productId) => {
  return await Product.findById(productId);
};

const getProductByPid = async (pid) => {
  return await Product.findOne({ pid });
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (pid, productData) => {
  return await Product.findOneAndUpdate({ pid }, productData, { new: true });
};

const deleteProduct = async (pid) => {
  return await Product.findOneAndDelete({ pid });
};

export default {
  getProducts,
  getProductById,
  getProductByPid,
  createProduct,
  updateProduct,
  deleteProduct,
};
