import Cart from'../../models/cart.model.js'; // Supongo que existe un modelo `Cart`

const CartDAO = {
  getById: (id) => Cart.findById(id).populate('products.product'),
  create: () => new Cart({ products: [] }).save(),
  addProduct: async (cartId, productId, quantity = 1) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return cart.save();
  },
  removeProduct: async (cartId, productId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = cart.products.filter((p) => p.product.toString() !== productId);
    return cart.save();
  },
  clearCart: async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    cart.products = [];
    return cart.save();
  },
};

module.exports = CartDAO;