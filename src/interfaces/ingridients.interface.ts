import { Document, ObjectId } from "mongoose";
import { DataResponse, PaginatedResponse } from "../types/response.types";
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IIngridients extends Document {
  serialNo: number;
  name: string;
  supplier?: ObjectId[];
  category: ObjectId;
  branch?: ObjectId;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStockLevel?: number;
  reorderLevel?: number;
  unit: "kg" | "g" | "l" | "ml" | "pcs" | "pack" | "other";
  status?: "active" | "inactive";
  stockHistory?: Array<{
    date: Date;
    change: number;
    reason?: string;
    user?: ObjectId;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//ingridients create interface
export interface ICreateIngridients {
  serialNo: number;
  name: string;
  supplier: ObjectId[];
  category: ObjectId;
  branch?: ObjectId;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStockLevel?: number;
  reorderLevel?: number;
  unit: "kg" | "g" | "l" | "ml" | "pcs" | "pack" | "other";
  status?: "active" | "inactive";
}
//ingridients update interface
export interface IUpdateIngridients {
  serialNo?: number;
  name?: string;
  supplier?: ObjectId[];
  category?: ObjectId;
  branch?: ObjectId;
  costPrice?: number;
  salePrice?: number;
  stock?: number;
  minStockLevel?: number;
  reorderLevel?: number;
  unit?: "kg" | "g" | "l" | "ml" | "pcs" | "pack" | "other";
  status?: "active" | "inactive";
}
//-----------------------------------------
//---------Response Related Types (use generics)--------
// Single item response: DataResponse<IIngridients>
// Paginated list response: PaginatedResponse<IIngridients>
