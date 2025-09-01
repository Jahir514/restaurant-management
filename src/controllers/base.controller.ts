import { Request, Response, NextFunction } from "express";

/**
 * BaseController
 *
 * Provides reusable CRUD controller methods for standard REST APIs.
 * Extend this class in your specific controllers to avoid code duplication.
 * Pass the service instance (with CRUD methods) to the constructor.
 *
 * @template TService - The type of the service class (should implement CRUD methods)
 */
export class BaseController<TService> {
  /**
   * @param service The service instance that provides CRUD methods (create, findAll, findById, update, delete)
   */
  constructor(protected readonly service: TService) {}

  /**
   * Handles HTTP POST requests to create a new resource.
   * Calls the service's create method with request body.
   * @param req Express request object
   * @param res Express response object
   * @param next Express next middleware function
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await (this.service as any).create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles HTTP GET requests to fetch all resources.
   * Calls the service's findAll method.
   * @param req Express request object
   * @param res Express response object
   * @param next Express next middleware function
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await (this.service as any).findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles HTTP GET requests to fetch a single resource by ID.
   * Calls the service's findById method.
   * @param req Express request object
   * @param res Express response object
   * @param next Express next middleware function
   */
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await (this.service as any).findById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles HTTP PUT/PATCH requests to update a resource by ID.
   * Calls the service's update method.
   * @param req Express request object
   * @param res Express response object
   * @param next Express next middleware function
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await (this.service as any).update(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles HTTP DELETE requests to remove a resource by ID.
   * Calls the service's delete method.
   * @param req Express request object
   * @param res Express response object
   * @param next Express next middleware function
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await (this.service as any).delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
