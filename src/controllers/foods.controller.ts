import { BaseController } from "./base.controller";
import foodService from "../services/foods.service";

/**
 * FoodController
 *
 * Extends BaseController to provide standard CRUD endpoints for foods/package menus.
 * Custom endpoints can be added as needed.
 */
export class FoodController extends BaseController<typeof foodService> {
  constructor() {
    super(foodService);
  }

  // Add custom endpoints for foods here if needed
  // Example:
  // async customEndpoint(req: Request, res: Response, next: NextFunction) { ... }
}

// Export a singleton instance for use in routes
export const foodController = new FoodController();
