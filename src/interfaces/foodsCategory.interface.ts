import { Document } from "mongoose";

/**
 * @interface IFoodsCategory
 * Represents a foods category in the restaurant application.
 */
export interface IFoodsCategory extends Document {
  category_name: string;
  slug: string;
  description: string;
  parent_id?: string | null;
  menu?: "0" | "1";
  image?: string | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * Interface for creating a new foods category
 */
export interface ICreateFoodsCategory {
  category_name: string;
  slug: string;
  description: string;
  parent_id?: string | null;
  menu?: "0" | "1";
  image?: string | null;
}

/**
 * Interface for updating a foods category
 */
export interface IUpdateFoodsCategory {
  category_name?: string;
  slug?: string;
  description?: string;
  parent_id?: string | null;
  menu?: "0" | "1";
  image?: string | null;
}
