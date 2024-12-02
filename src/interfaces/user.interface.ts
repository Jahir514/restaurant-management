import { Document } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
interface Verify {
  code?: number;
  status?: boolean;
  date?: Date;
}
interface Phone extends Verify {
  number: string;
}
interface Contact {
  address: string;
  thana: string;
  district: string;
  division: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: Phone;
  avatar?: string;
  emailVerify?: Verify;
  forgotPassword?: Verify;
  contact?: Contact;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Related Interfaces--------
//-----------------------------------------
//user register interface
export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

//-----------------------------------------
//---------Response Related Interfaces--------
//-----------------------------------------
export interface IRegisterUserResponse {
  success: true;
  message: string;
  user: null | IUser;
}
