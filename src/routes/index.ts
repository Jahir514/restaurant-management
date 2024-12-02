import { Router } from 'express';
import supplierRoutes from './supplier.routes';
import authRoutes from './auth.routes';
const router = Router();

//all features route
//supplier routes
router.use('/supplier', supplierRoutes);
//auth routes
router.use('/auth', authRoutes);

export default router;
