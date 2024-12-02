import { IRegisterUser, IRegisterUserResponse, IUser } from '../interfaces/user.interface';
import User from '../model/user.model';
import { AppError } from '../utils/AppError';

//user register service
const register = async (userData: IRegisterUser): Promise<IRegisterUserResponse> => {
  const { name, email, password } = userData;
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
  return {
    success: true,
    message: 'Successfully create an User.',
    user: savedUserData,
  };
};

//user login service
const login = async () => {};
export default {
  register,
  login,
};
