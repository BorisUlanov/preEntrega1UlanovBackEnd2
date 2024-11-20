import { router } from 'express';
import Product from '../models.product.model.js';

const router = Router();


// GET, paginacion filtro y ordenamiento
router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
        filter.$or = [
            { category: { $regex: query, $options: 'i' } },
            { available: query === 'true' }
        ];//Creditos para W3Schools para el fintro con regex
    }

    const sortOption = {};
    if (sort) {
        sortOption.price = sort === 'asc' ? 1 : -1;
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOption,
    };

    const result = await Product.paginate(filter, options);
    const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = result;
//Añado elementos de la consigna
    res.render('products', {
        products: docs,
        totalPages,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null,
        nextLink: hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null,
    });
});

export default router;