import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export default class Product {
  static get model() {
    return 'products';
  }

  static get schema() {
    return {
      id: String,
      title: String,
      description: String,
      code: String,
      price: Number,
      status: Boolean,
      stock: Number,
      category: String,
      thumbnails: [String],
      owner: {
        type: String,
        required: true,
        default: 'admin',
      },
    };
  }
}

// create schema and apply plugin
const productSchema = new mongoose.Schema(Product.schema);
productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(Product.model, productSchema);

export { ProductModel };
