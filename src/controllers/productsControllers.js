import * as productService from '../services/productsServices.js';

export const getProductsController = async (req, res) => {
  try {
    const user = req.session.user;
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productService.getProducts(limit, page, sort, query);

    const totalPages = result.totalPages;
    const prevPage = result.prevPage;
    const nextPage = result.nextPage;
    const currentPage = result.page;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;
  
    res.render('products', {
      products: result.products,
      user: req.session.user,
      totalPages,
      prevPage,
      nextPage,
      currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const getProductByPid = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productService.getProductByPid(pid);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = await productService.updateProduct(pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
    const user = await UserModel.findById(product.owner);

    if (user.role === 'premium') {
        // Enviar correo al usuario
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Producto eliminado',
            text: `El producto ${product.name} ha sido eliminado.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }
  try {
    const pid = req.params.pid;
    const deletedProduct = await productService.deleteProduct(pid);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
