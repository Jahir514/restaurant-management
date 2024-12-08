import { Document, ObjectId } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IIngridients extends Document {
  serialNo: number;
  name: string;
  supplier: ObjectId;
  category: ObjectId;
  costPrice: number;
  salePrice: number;
  stock: number;
  unit: string;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//ingridients  create interface
export interface ICreateIngridients {
  serialNo: number;
  name: string;
  supplier: ObjectId;
  category: ObjectId;
  costPrice: number;
  salePrice: number;
  stock: number;
  unit: string;
}
//ingridients  update interface
export interface IUpdateIngridients {
  serialNo?: number;
  name?: string;
  supplier?: ObjectId;
  category?: ObjectId;
  costPrice?: number;
  salePrice?: number;
  stock?: number;
  unit?: string;
}
//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------
//ingridients  create response interface
export interface ICreateIngridientsResponse {
  success: boolean;
  message: string;
  ingridients: null | IIngridients;
}
//ingridients  get response interface
export interface IGetIngridientsResponse {
  message: string;
  ingridients: null | IIngridients | IIngridients[];
}
//ingridients  update response interface
export interface IUpdateIngridientsResponse extends ICreateIngridientsResponse {}
//ingridients  delete response interface
export interface IDeleteIngridientsResponse {
  success: boolean;
  message: string;
}
