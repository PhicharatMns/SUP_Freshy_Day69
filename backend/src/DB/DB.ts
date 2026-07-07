import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool(process.env.DATABASE_URL!);

export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("🚀 Database connected successfully!");
    conn.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
