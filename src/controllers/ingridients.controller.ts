import { BaseController } from "./base.controller";
import ingridientsService from "../services/ingridients.service";

/**
 * IngridientsController
 *
 * Extends BaseController to provide standard CRUD endpoints for ingredients.
 * Custom endpoints can be added as needed.
 */
export class IngridientsController extends BaseController<typeof ingridientsService> {
  constructor() {
    super(ingridientsService);
  }

  // If you have custom endpoints, add them here as methods
  // Example:
  // async customEndpoint(req: Request, res: Response, next: NextFunction) { ... }
}

// Export a singleton instance for use in routes
export const ingridientsController = new IngridientsController();
