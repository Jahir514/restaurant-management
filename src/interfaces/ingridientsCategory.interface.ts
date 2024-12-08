import { Document } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface IIngridientsCategory extends Document {
  serialNo: number;
  name: string;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//ingridients category create interface
export interface ICreateIngridientsCategory {
  serialNo: number;
  name: string;
}
//ingridients category update interface
export interface IUpdateIngridientsCategory {
  serialNo?: number;
  name?: string;
}
//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------
//ingridients category create response interface
export interface ICreateIngridientsCategoryResponse {
  success: boolean;
  message: string;
  ingridientsCategory: null | IIngridientsCategory;
}
//ingridients category get response interface
export interface IGetIngridientsCategoryResponse {
  message: string;
  ingridientsCategory: null | IIngridientsCategory | IIngridientsCategory[];
}
//ingridients category update response interface
export interface IUpdateIngridientsCategoryResponse extends ICreateIngridientsCategoryResponse {}
//ingridients category delete response interface
export interface IDeleteIngridientsCategoryResponse {
  success: boolean;
  message: string;
}
