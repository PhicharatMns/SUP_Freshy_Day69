import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors';
import { rateLimiter } from 'hono-rate-limiter';
// นำเข้า Routes โครงสร้างใหม่
import qaRoutes from './routes/qaRoutes.js';
import igMyRoutes from './routes/igMyRoutes.js';
import popcatRoutes from './routes/popcatRoutes.js';
import controlRoutes from './routes/controlRoutes.js';
const app = new Hono();
// เชื่อมต่อฐานข้อมูล
await connectDB();
app.use('*', cors({
    origin: '*',
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
// 🛡️ Rate Limiting — ป้องกันการยิง API ซ้ำๆ
// จำกัด: GET ทั่วไป 100 ครั้ง/นาที ต่อ IP
app.use('*', rateLimiter({
    windowMs: 60 * 1000, // ช่วงเวลา 1 นาที
    limit: 100, // สูงสุด 100 requests ต่อนาที ต่อ IP
    keyGenerator: (c) => c.req.header('cf-connecting-ip') ?? // IP จริงจาก Cloudflare
        c.req.header('x-forwarded-for') ??
        'unknown',
    message: { success: false, message: 'ส่งคำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
    skip: (c) => c.req.header('x-bypass-limit') === 'true' // 🔑 แนบ header ลับเพื่อ bypass สำหรับ load test
}));
// จำกัด: POST (ส่งข้อมูล/อัปโหลด) 20 ครั้ง/นาที  IP
app.use('*/Qafrom', rateLimiter({
    windowMs: 60 * 1000,
    limit: 20,
    keyGenerator: (c) => c.req.header('cf-connecting-ip') ??
        c.req.header('x-forwarded-for') ??
        'unknown',
    message: { success: false, message: 'ส่งฟอร์มมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
    skip: (c) => c.req.header('x-bypass-limit') === 'true' // 🔑 แนบ header ลับเพื่อ bypass สำหรับ load test
}));
app.get('/', (c) => c.json({ message: 'API is running' }));
app.route('/Qafrom', qaRoutes);
app.route('/ig_my', igMyRoutes);
app.route('/popcar', popcatRoutes);
app.route('/apinext', controlRoutes);
const port = Number(process.env.PORT) || 5000;
serve({ fetch: app.fetch, port });
