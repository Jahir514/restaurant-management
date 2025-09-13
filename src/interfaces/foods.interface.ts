import { Document } from "mongoose";

/**
 * @interface IFood
 * Represents a food/package menu item in the restaurant application.
 */
export interface IFood extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number | null;
  status: "0" | "1"; // 0: inactive, 1: active
  featured: "0" | "1"; // 0: not featured, 1: featured
  created_at: Date;
  updated_at: Date;
}

/**
 * Interface for creating a new food/package menu item
 */
export interface ICreateFood {
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price?: number | null;
  status?: "0" | "1";
  featured?: "0" | "1";
}

/**
 * Interface for updating a food/package menu item
 */
export interface IUpdateFood {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  discount_price?: number | null;
  status?: "0" | "1";
  featured?: "0" | "1";
}
