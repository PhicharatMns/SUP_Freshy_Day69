import { PrismaClient } from "@prisma/client";
import "dotenv/config";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🚀 Database connected successfully via Prisma!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
