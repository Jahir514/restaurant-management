import { ILoginUser, ILoginUserResponse, IRegisterUser, IRegisterUserResponse, IUser } from '../interfaces/user.interface';
import User from '../model/user.model';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

//user register service
const register = async (userData: IRegisterUser): Promise<IRegisterUserResponse> => {
  const { name, email, password } = userData;
  const jwt_secret = process.env.JWT_SECRET || 'Restaurant112000';
  console.log('jwt secret', jwt_secret);
  //check for empty fields
  if (!name || !email || !password) {
    throw new AppError('Name, Email and Password is required', 400);
  }
  //check if user exist
  const existUser: IUser | null = await User.findOne({ email: email });
  if (existUser) {
    throw new AppError('User Already Exist', 400);
  }
  //create new user object
  const newUser = new User({
    name,
    email,
    password,
  });
  //save user to database
  const savedUser: IUser | null = await newUser.save();
  //handle response
  if (!savedUser) {
    throw new AppError('Failed to create User', 400);
  }
  const savedUserData = await User.findOne({ _id: savedUser._id }).select('name email contact phone');
  const token = jwt.sign({ id: savedUserData?._id, email: savedUserData?.email }, jwt_secret, { expiresIn: '1h' });
  return {
    success: true,
    message: 'Successfully create an User.',
    user: savedUserData,
    token,
  };
};

//user login service
const login = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;
  const jwt_secret = process.env.JWT_SECRET || 'Restaurant112000';
  //check for empty fields
  if (!email || !password) {
    throw new AppError('Email and Password is required', 400);
  }
  //check if user exist
  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    throw new AppError('User Not Found', 400);
  }
  //compare password
  const isMatch = await existUser?.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Password Invalid.', 400);
  }
  const token = jwt.sign({ id: existUser?._id, email: existUser?.email }, jwt_secret, { expiresIn: '1h' });
  const userData = {
    name: existUser.name,
    email: existUser.email,
    phone: existUser.phone,
    avatar: existUser.avatar,
    emailVerify: existUser.emailVerify,
    forgotPassword: existUser.forgotPassword,
    contact: existUser.contact,
  };
  return {
    success: true,
    message: 'Login Successful.',
    user: userData,
    token,
  };
};
export default {
  register,
  login,
};
