import { router } from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();

//lista
let products = [];

//Ruta oara ver los productos
router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
});


router.get('/realtimeproducts', (req, res) => {
    res.render('relTimeProducts', { products});
});

export default router;