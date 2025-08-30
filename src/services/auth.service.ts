import { BaseError } from '../errors/BaseError';
import { ILoginUser, ILoginUserResponse, IRegisterUser, IRegisterUserResponse, IUser } from '../interfaces/user.interface';
import User from '../model/user.model';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { formatAndValidateBDPhone } from '../utils/validatePhone';
import { generateOtp, otpExpiry } from '../utils/otp';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET || 'Restaurant112000';

//send OTP
export const sendPhoneOtp = async (phone: string) => {
  const formatted = formatAndValidateBDPhone(phone);
  if (!formatted) throw new BaseError('VALIDATION_ERROR', 400, 'Invalid phone');

  const otp = generateOtp();
  const expiresAt = otpExpiry();

  let user = await User.findOne({ 'phone.number': formatted });
  if (!user) {
    user = new User({ phone: { number: formatted, status: false, otp: { code: otp, expiresAt } } });
  } else {
    if (!user.phone || !user.phone.number) {
      throw new BaseError('VALIDATION_ERROR', 400, 'Phone number not found for user');
    } else {
      user.phone.otp = { code: otp, expiresAt };
    }
  }
  await user.save();
  console.log(`🔐 OTP sent to ${formatted}: ${otp}`);
  return { success: true, message: 'OTP sent' };
};

// Verify OTP
export const verifyPhoneOtp = async (phone: string, otp: string) => {
  const formatted = formatAndValidateBDPhone(phone);
  if (!formatted) throw new BaseError('VALIDATION_ERROR', 400, 'Invalid phone number');

  const user = await User.findOne({ 'phone.number': formatted });
  if (!user || !user.phone?.otp?.code) throw new BaseError('NOT_FOUND', 404, 'OTP not found');

  if (user.phone.otp.code !== otp) throw new BaseError('VALIDATION_ERROR', 400, 'Incorrect OTP');
  if (new Date() > new Date(user.phone.otp.expiresAt)) throw new BaseError('VALIDATION_ERROR', 400, 'OTP expired');

  user.phone.status = true;
  user.phone.otp = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '1h' });
  return { token, user };
};

// Final registration (after OTP verified)
export const completePhoneRegistration = async ({ phone, otp, password }: any) => {
  const { token, user } = await verifyPhoneOtp(phone, otp);

  if (!user.password) {
    user.password = password;
    await user.save();
  }
  return { success: true, token, user };
};

//user register service
const register = async (userData: IRegisterUser): Promise<IRegisterUserResponse> => {
  const { email, password } = userData;
  //check for empty fields
  if (!email || !password) {
    throw new BaseError('VALIDATION_ERROR', 400, 'Name, Email and Password is required');
  }

  //check if user exist
  const existUser: IUser | null = await User.findOne({ email: email });
  if (existUser) {
    throw new BaseError('VALIDATION_ERROR', 400, 'User Already Exist');
  }
  //create new user object
  const newUser = new User({
    email,
    password,
  });
  //save user to database
  const savedUser: IUser | null = await newUser.save();
  //handle response
  if (!savedUser) {
    throw new BaseError('DATABASE_ERROR', 400, 'Failed to create User');
  }
  const savedUserData = await User.findById({ _id: savedUser._id }).select('name email contact phone');
  const token = jwt.sign({ id: savedUserData?._id, email: savedUserData?.email }, jwt_secret, { expiresIn: '1h' });
  console.log('user', savedUserData);
  return {
    success: true,
    message: 'Successfully create an User.',
    user: savedUserData,
    token,
  };
};

//user login service
const login = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { emailOrPhone, password } = data;
  let loginField = emailOrPhone;
  //check for empty fields
  if (!emailOrPhone || !password) {
    throw new BaseError('VALIDATION_ERROR', 400, 'Email and Password is required');
  }
  //check valid phone number
  if (!loginField.includes('@')) {
    const formattedPhone = formatAndValidateBDPhone(loginField);
    if (!formattedPhone) {
      throw new BaseError('VALIDATION_ERROR', 400, 'Invalid Bangladeshi phone number');
    }
    loginField = formattedPhone;
  }
  //set query based on email or phone
  const query = loginField.includes('@') ? { email: loginField } : { 'phone.number': loginField };
  //check if user exist
  const existUser = await User.findOne(query);
  if (!existUser) {
    throw new BaseError('NOT_FOUND', 400, 'User Not Found');
  }
  //compare password
  const isMatch = await existUser?.comparePassword(password);
  if (!isMatch) {
    throw new BaseError('AUTH_ERROR', 400, 'Password Invalid.');
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
  sendPhoneOtp,
  verifyPhoneOtp,
  completePhoneRegistration,
};
