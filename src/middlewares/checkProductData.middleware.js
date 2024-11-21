module.exports = (req, res, next) => {
    const { name, price, stock, category } = req.body;
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Nombre del producto requerido (string)' });
    }
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Precio mayor a 0' });
    }
    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({ message: 'Stock mayor o igual a 0' });
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ message: 'Categoría del producto requerida (string)' });
    }
  
    next();
  };