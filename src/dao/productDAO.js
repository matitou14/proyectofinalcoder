
import Product from '../models/productsModel.js';

export async function getProducts(limit, page, sort, query) {
    const filter = query ? { title: { $regex: query, $options: 'i' } } : {};

    const options = {
        limit: limit,
        page: page,
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
    };

    const paginatedResults = await Product.paginate(filter, options);
    return paginatedResults;

}

export async function getProductById(productId) {
    return await Product.findById(productId);
}

export async function getProductByPid(pid) {
    return await Product.findOne({ pid });
}

export async function createProduct(productData) {
    return await Product.create(productData);
}

export async function updateProduct(pid, productData) {
    return await Product.findOneAndUpdate({ pid }, productData, { new: true });
}

export async function deleteProduct(pid) {
    return await Product.findOneAndDelete({ pid });
}
