import { config } from './env.config';

export const databaseConfig = {
  uri: config.database.mongoUri,
  options: {
    dbName: config.database.dbName,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    retryWrites: true
  },
  collections: {
    users: 'users',
    ingredients: 'ingredients',
    ingredientCategories: 'ingredient_categories',
    suppliers: 'suppliers'
  }
};