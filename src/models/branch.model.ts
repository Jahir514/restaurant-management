/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["active", "inactive"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         name: "Main Branch"
 *         code: "BR001"
 *         address: "123 Main St, City"
 *         phone: "+1234567890"
 *         email: "main@restaurant.com"
 *         status: "active"
 *         createdAt: "2025-08-31T12:00:00.000Z"
 *         updatedAt: "2025-08-31T12:00:00.000Z"
 *
 * tags:
 *   - name: Branch
 *     description: API endpoints for managing branches
 */
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

branchSchema.index({ name: 1 }, { unique: true });
branchSchema.index({ code: 1 }, { unique: true });
branchSchema.index({ status: 1 });

const Branch: Model<IBranch> = mongoose.model<IBranch>("Branch", branchSchema);
export default Branch;
