import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET_KEY,
  port: process.env.PORT || 8000,
  dbUrl: process.env.DB_URL,
};
