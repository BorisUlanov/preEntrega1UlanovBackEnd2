import { router } from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();

// GET como en ejemplo
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.render('cart', { cart });
});

//Put
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    const productIndex = cart.products.findIndex(item => item.product.toString() === pid);

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.json({ status: 'success', message: 'Cantidad de producto actualizada', cart });
});

//Delete
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    cart.products = cart.products.filter(item => item.product.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
});

export default router;