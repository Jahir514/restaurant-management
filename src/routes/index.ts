import { Router } from "express";
import supplierRoutes from "./supplier.routes";
import ingridientsCategoryRoutes from "./ingridientCategory.routes";
import ingridientsRoutes from "./ingridients.routes";
import authRoutes from "./auth.routes";
import foodRoutes from "./foods.routes";
const router = Router();

//all features route
//auth routes
router.use("/auth", authRoutes);
//supplier routes
router.use("/supplier", supplierRoutes);
//ingridients category routes
router.use("/ingredients-category", ingridientsCategoryRoutes);
//ingridients category routes
router.use("/ingredients", ingridientsRoutes);
//ingridients category routes
router.use("/foods", foodRoutes);
export default router;
