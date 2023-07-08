import Product from '../models/productsModel.js';

const getAllProducts = () => Product.find({});
const getProductById = (id) => Product.findById(id);
const getProductByPid = (pid) => Product.findOne({ pid });
const createProduct = (productData) => Product.create(productData);
const updateProduct = (pid, productData) => Product.findOneAndUpdate({ pid }, productData, { new: true });
const deleteProduct = (pid) => Product.findOneAndDelete({ pid });

export default {
  getAllProducts,
  getProductById,
  getProductByPid,
  createProduct,
  updateProduct,
  deleteProduct,
};
