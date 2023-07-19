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
    products: paginatedResults.docs.map(doc => doc.toJSON()),
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
  const product = await ProductModel.findById(productId).lean();
  return product.toJSON();
};

export const getProductByPid = async (pid) => {
  const product = await ProductModel.findOne({ pid }).lean();
  return product.toJSON();
};

export const createProduct = async (productData) => {
  const product = await ProductModel.create(productData);
  return product.toJSON();
};

export const updateProduct = async (pid, productData) => {
  const updatedProduct = await ProductModel.findOneAndUpdate({ pid }, productData, { new: true }).lean();
  return updatedProduct.toJSON();
};

export const deleteProduct = async (pid) => {
  const deletedProduct = await ProductModel.findOneAndDelete({ pid }).lean();
  return deletedProduct.toJSON();
};
