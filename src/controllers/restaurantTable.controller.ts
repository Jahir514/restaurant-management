import { BaseController } from "./base.controller";
import restaurantTableService from "../services/restaurantTable.service";

/**
 * RestaurantTableController
 *
 * Extends BaseController to provide standard CRUD endpoints for restaurant tables.
 * Custom endpoints can be added as needed.
 */
export class RestaurantTableController extends BaseController<
  typeof restaurantTableService
> {
  constructor() {
    super(restaurantTableService);
  }

  // Add custom endpoints for restaurant tables here if needed
}

// Export a singleton instance for use in routes
export const restaurantTableController = new RestaurantTableController();
