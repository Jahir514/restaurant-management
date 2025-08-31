import { Document } from "mongoose";

// Model interface
export interface IBranch extends Document {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

// CRUD interfaces
export interface ICreateBranch {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: "active" | "inactive";
}

export interface IUpdateBranch {
  name?: string;
  code?: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: "active" | "inactive";
}

// Response types (using generics if available in your project)
// import { DataResponse, PaginatedResponse } from '../types/response.types';
// type BranchResponse = DataResponse<IBranch>;
// type BranchListResponse = PaginatedResponse<IBranch>;
