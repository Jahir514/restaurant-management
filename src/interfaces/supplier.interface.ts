import { Document, ObjectId } from 'mongoose'
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
//supplier create interface
export interface ICreateSupplier {
  serialNo?: number
  name: string
  contact?: Contact
}
//supplier create response interface
export interface ICreateSupplierResponse {
  success: boolean
  message: string
  supplier: null | ISupplier
}
//supplier update interface
export interface IUpdateSupplier {
  serialNo?: number
  name?: string
  contact?: Contact
}
//supplier delete interface
export interface IDeleteSupplier {
  id: ObjectId
}
