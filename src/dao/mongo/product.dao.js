import Product from '../../models/product.model.js';

class ProductDAO {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async createProduct(data) {
    const newProduct = new Product(data);
    await newProduct.save();
    return newProduct;
  }
}
export default ProductDAO;