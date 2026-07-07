import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// 🇹🇭 โหลด Timezone จากไฟล์ .env (มี Default fallback เป็น Asia/Bangkok)
process.env.TZ = process.env.TZ || "Asia/Bangkok";

const rawPrisma = new PrismaClient();

// 🛡️ Prisma Extension - ปรับเวลาบวก 7 ชั่วโมงอัตโนมัติ สำหรับทุกตารางที่มีฟิลด์เวลา
export const prisma = rawPrisma.$extends({
  query: {
    $allModels: {
      async create({ model, args, query }) {
        const data = args.data as any;
        if (data) {
          const now = new Date(Date.now() + 7 * 60 * 60 * 1000);
          if ('created_at' in data) {
            data.created_at = now;
          }
          if ('updated_at' in data) {
            data.updated_at = now;
          }
        }
        return query(args);
      },
      async update({ model, args, query }) {
        const data = args.data as any;
        if (data) {
          const now = new Date(Date.now() + 7 * 60 * 60 * 1000);
          if ('updated_at' in data) {
            data.updated_at = now;
          }
        }
        return query(args);
      },
      async upsert({ model, args, query }) {
        const now = new Date(Date.now() + 7 * 60 * 60 * 1000);
        
        const createData = args.create as any;
        if (createData) {
          if ('created_at' in createData) {
            createData.created_at = now;
          }
          if ('updated_at' in createData) {
            createData.updated_at = now;
          }
        }

        const updateData = args.update as any;
        if (updateData) {
          if ('updated_at' in updateData) {
            updateData.updated_at = now;
          }
        }
        return query(args);
      }
    }
  }
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🚀 Database connected successfully via Prisma!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
