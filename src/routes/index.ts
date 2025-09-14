import { Router } from "express";
import supplierRoutes from "./supplier.routes";
import ingridientsCategoryRoutes from "./ingridientCategory.routes";
import ingridientsRoutes from "./ingridients.routes";
import authRoutes from "./auth.routes";
import foodRoutes from "./foods.routes";
import foodCategoryRoutes from "./foodsCategory.routes";
import restaurantTableRoutes from "./restaurantTable.routes";
const router = Router();

//all features route
//auth routes
router.use("/auth", authRoutes);
//supplier routes
router.use("/supplier", supplierRoutes);
//ingredients category routes
router.use("/ingredients-category", ingridientsCategoryRoutes);
//ingredients routes
router.use("/ingredients", ingridientsRoutes);
//foods routes
router.use("/foods", foodRoutes);
//foods category routes
router.use("/foods-category", foodCategoryRoutes);
//restaurant table routes
router.use("/restaurant-table", restaurantTableRoutes);
export default router;
