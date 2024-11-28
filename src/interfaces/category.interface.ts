import { ObjectId, Document } from 'mongoose'

//full model interface
export interface ICategory extends Document {
  serialNo: number
  name: string
  createdAt?: Date
  updateAt?: Date
}

//category create interface
export interface ICreateCategory {
  serialNo: number
  name: string
}
//category update interface
export interface IUpdateCategory {
  serialNo?: number
  name?: string
}
//category delete interface
export interface IDeleteCategory {
  id: ObjectId
}
