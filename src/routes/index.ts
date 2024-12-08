import { Router } from 'express';
import supplierRoutes from './supplier.routes';
import ingridientsCategory from './ingridientCategory.routes';
import ingridients from './ingridients.routes';
import authRoutes from './auth.routes';
const router = Router();

//all features route
//auth routes
router.use('/auth', authRoutes);
//supplier routes
router.use('/supplier', supplierRoutes);
//ingridients category routes
router.use('/ingredients-category', ingridientsCategory);
//ingridients category routes
router.use('/ingredients', ingridients);

export default router;
