import { BaseController } from "./base.controller";
import foodsCategoryService from "../services/foodsCategory.service";

/**
 * FoodsCategoryController
 *
 * Extends BaseController to provide standard CRUD endpoints for foods categories.
 * Custom endpoints can be added as needed.
 */
export class FoodsCategoryController extends BaseController<
  typeof foodsCategoryService
> {
  constructor() {
    super(foodsCategoryService);
  }

  // Add custom endpoints for foods categories here if needed
}

// Export a singleton instance for use in routes
export const foodsCategoryController = new FoodsCategoryController();
