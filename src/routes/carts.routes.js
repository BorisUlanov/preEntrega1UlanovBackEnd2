import { Router } from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();

// GET
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    // Busco para llenar
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener el carrito', error });
  }
});

// PUT
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    // Verifico
    const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
    if (productIndex >= 0) {
      // update
      cart.products[productIndex].quantity = quantity;
    } else {
      // Si no esta add
      const product = await Product.findById(pid);
      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    res.json({ status: 'success', message: 'Carrito actualizado', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito', error });
  }
});

//DELETE
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    cart.products = cart.products.filter(item => item.product.toString() !== pid);
    await cart.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito', cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito', error });
  }
});

export default router;