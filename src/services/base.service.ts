import { Document, Model } from "mongoose";
import { ICrudOperations } from "../interfaces/crud.interface";
import { IQueryFilters } from "../interfaces/common.interface";
import { DatabaseError } from "../errors/DatabaseError";
import { logger } from "../config/logger.config";

export abstract class BaseService<T extends Document>
  implements ICrudOperations<T>
{
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      const newDoc = new this.model(data);
      return await newDoc.save();
    } catch (error) {
      throw new DatabaseError(`Failed to create ${this.model.modelName}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new DatabaseError(`Failed to find ${this.model.modelName} by id`);
    }
  }

  async findOne(filter: any): Promise<T | null> {
    try {
      return await this.model.findOne(filter);
    } catch (error) {
      throw new DatabaseError(`Failed to find ${this.model.modelName}`);
    }
  }

  async findAll(filters: IQueryFilters = {}) {
    try {
      const page = filters?.page || 1;
      const limit = filters?.limit || 10;
      const skip = (page - 1) * limit;

      const query: any = {};
      if (filters?.isActive !== undefined) {
        query.isActive = filters.isActive;
      }
      if (filters?.search) {
        query.name = { $regex: filters.search, $options: "i" };
      }

      const sort = filters?.sort || {};
      logger.info(
        `Fetching ${this.model.modelName} list with filters: ${JSON.stringify(
          filters
        )}`
      );
      const [items, total] = await Promise.all([
        this.model.find(query).skip(skip).limit(limit).sort(sort),
        this.model.countDocuments(query),
      ]);

      return {
        items,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new DatabaseError(`Failed to fetch ${this.model.modelName} list`);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new DatabaseError(`Failed to update ${this.model.modelName}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw new DatabaseError(`Failed to delete ${this.model.modelName}`);
    }
  }
}
