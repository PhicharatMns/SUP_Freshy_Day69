import { Pool } from 'pg'
import 'dotenv/config'

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // เปลี่ยนตรงนี้เป็น false เพื่อยอมรับ self-signed certificate ของ Supabase
    }
})

export const connectDB = async () => {
    try {
        const client = await pool.connect(); 
        console.log("🚀 Database connected successfully!");
        client.release(); 
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};