import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// 🇹🇭 โหลด Timezone จากไฟล์ .env (มี Default fallback เป็น Asia/Bangkok)
process.env.TZ = process.env.TZ || "Asia/Bangkok";

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
