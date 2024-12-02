import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
//create schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      number: {
        type: String,
        unique: true,
        required: true,
      },
      code: {
        type: Number,
      },
      status: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    contact: {
      address: {
        type: String,
      },
      thana: {
        type: String,
      },
      district: {
        type: String,
      },
      division: {
        type: String,
      },
    },
    emailVerify: {
      code: {
        type: String,
        require: true,
      },
      status: {
        type: Boolean,
        require: true,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    forgotPassword: {
      code: {
        type: String,
      },
      status: {
        type: Boolean,
      },
      date: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);
//create Indexes
userSchema.index({});

//create Model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
