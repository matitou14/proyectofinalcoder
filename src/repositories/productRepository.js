import ProductModel from '../models/productsModel.js';

export const getProducts = async (limit, page, sort, query) => {
  const filter = query ? { title: { $regex: query, $options: 'i' } } : {};

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

export const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

export const getProductByPid = async (pid) => {
  return await ProductModel.findOne({ pid });
};

export const createProduct = async (productData) => {
  return await ProductModel.create(productData);
};

export const updateProduct = async (pid, productData) => {
  return await ProductModel.findOneAndUpdate({ pid }, productData, { new: true });
};

export const deleteProduct = async (pid) => {
  return await ProductModel.findOneAndDelete({ pid });
};
