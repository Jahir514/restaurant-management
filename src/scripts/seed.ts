/**
 * Seed script for MongoDB using Mongoose
 * Run with: npx ts-node src/scripts/seed.ts
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Branch from "../models/branch.model";
import IngridientsCategory from "../models/ingridientsCategory.model";
import Ingridients from "../models/ingridients.model";
import Supplier from "../models/supplier.model";
import User from "../models/user.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurant-management";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Seed branches
    const branches = await Branch.insertMany([
      { name: "Main Branch", code: "BR001", address: "123 Main St", status: "active" },
      { name: "Second Branch", code: "BR002", address: "456 Second St", status: "active" },
    ]);
    console.log("Branches seeded:", branches.length);

    // Seed ingredient categories
    const categories = await IngridientsCategory.insertMany([
      { serialNo: 1001, name: "Vegetables", status: "active" },
      { serialNo: 1002, name: "Meat", status: "active" },
    ]);
    console.log("Ingredient categories seeded:", categories.length);

    // Seed suppliers
    const suppliers = await Supplier.insertMany([
      { serialNo: 2001, name: "Fresh Farm", contact: { phone: [1234567890], address: "Farm Road" } },
      { serialNo: 2002, name: "Meat House", contact: { phone: [9876543210], address: "Meat Street" } },
    ]);
    console.log("Suppliers seeded:", suppliers.length);

    // Seed users
    const users = await User.insertMany([
      { name: "Admin", email: "admin@restaurant.com", password: "admin123", contact: { address: "HQ" } },
      { name: "Manager", email: "manager@restaurant.com", password: "manager123", contact: { address: "Branch" } },
    ]);
    console.log("Users seeded:", users.length);

    // Seed ingredients
    await Ingridients.insertMany([
      {
        serialNo: 1001,
        name: "Tomato",
        category: categories[0]._id,
        costPrice: 10,
        salePrice: 15,
        stock: 100,
        unit: "kg",
        status: "active",
        branch: branches[0]._id,
        supplier: [suppliers[0]._id],
      },
      {
        serialNo: 1002,
        name: "Chicken",
        category: categories[1]._id,
        costPrice: 120,
        salePrice: 150,
        stock: 50,
        unit: "kg",
        status: "active",
        branch: branches[1]._id,
        supplier: [suppliers[1]._id],
      },
    ]);
    console.log("Ingredients seeded");

    await mongoose.disconnect();
    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
