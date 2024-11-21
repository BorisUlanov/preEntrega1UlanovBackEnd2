//Router principal

import express from'express';
import { Router } from 'express';
import sessionRoutes from'./session.routes.js';
import productRoutes from'./products.routes.js';
import cartRoutes from'./carts.routes.js';

const router = express.Router();

router.use('/sessions', sessionRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

export default router;