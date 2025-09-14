import { Document } from "mongoose";

/**
 * @interface IRestaurantTable
 * Represents a restaurant table in the application.
 */
export interface IRestaurantTable extends Document {
  name: string;
  description?: string | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * Interface for creating a new restaurant table
 */
export interface ICreateRestaurantTable {
  name: string;
  description?: string | null;
}

/**
 * Interface for updating a restaurant table
 */
export interface IUpdateRestaurantTable {
  name?: string;
  description?: string | null;
}
