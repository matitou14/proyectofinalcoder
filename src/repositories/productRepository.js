// productRepository.js
import * as productDAO from '../dao/productDAO.js';

export async function getProducts(limit, page, sort, query) {
    const paginatedResults = await productDAO.getProducts(limit, page, sort, query);
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
}

export async function getProductById(productId) {
    return await productDAO.getProductById(productId);
}

export async function getProductByPid(pid) {
    return await productDAO.getProductByPid(pid);
}

export async function createProduct(productData) {
    return await productDAO.createProduct(productData);
}

export async function updateProduct(pid, productData) {
    return await productDAO.updateProduct(pid, productData);
}

export async function deleteProduct(pid) {
    return await productDAO.deleteProduct(pid);
}
