import { Document } from "mongoose";
import { DataResponse, PaginatedResponse } from "../types/response.types";
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IIngridientsCategory extends Document {
  serialNo: number;
  name: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//ingridients category create interface
export interface ICreateIngridientsCategory {
  serialNo: number;
  name: string;
  status?: "active" | "inactive"; // Optional status field
}
//ingridients category update interface
export interface IUpdateIngridientsCategory {
  serialNo?: number;
  name?: string;
  status?: "active" | "inactive"; // Optional status field
}
//-----------------------------------------
//---------Response Related Types (use generics)--------
// Use DataResponse<IIngridientsCategory> for single item responses
// Use PaginatedResponse<IIngridientsCategory> for paginated list responses
