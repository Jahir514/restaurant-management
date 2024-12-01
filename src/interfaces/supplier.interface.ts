import { Document, ObjectId } from 'mongoose'
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//contact interface
interface Contact {
  phone?: number[]
  address?: string
}
//full model interface
export interface ISupplier extends Document {
  serialNo: number
  name: string
  contact?: Contact
  createdAt?: Date
  updateAt?: Date
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
//supplier create interface
export interface ICreateSupplier {
  serialNo?: number
  name: string
  contact?: Contact
}
//supplier update interface
export interface IUpdateSupplier {
  serialNo?: number
  name?: string
  contact?: Contact
}

//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------

//supplier create response interface
export interface ICreateSupplierResponse {
  success: boolean
  message: string
  supplier: null | ISupplier
}
//supplier get response interface
export interface IGetSupplierResponse {
  message: string
  supplier: null | ISupplier | ISupplier[]
}
//supplier update response interface
export interface IUpdateSupplierResponse extends ICreateSupplierResponse {}
//supplier delete response interface
export interface IDeleteSupplierResponse {
  success: boolean
  message: string
}
