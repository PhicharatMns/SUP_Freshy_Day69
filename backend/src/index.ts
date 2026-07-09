import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors';
import { rateLimiter } from 'hono-rate-limiter';
import { logger } from 'hono/logger';

// นำเข้า Routes โครงสร้างใหม่
import qaRoutes from './routes/qaRoutes.js';
import igMyRoutes from './routes/igMyRoutes.js';
import popcatRoutes from './routes/popcatRoutes.js';
import controlRoutes from './routes/controlRoutes.js';

const app = new Hono();

// เชื่อมต่อฐานข้อมูล
await connectDB();

app.use('*', logger());

app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://spu69.online', 'https://www.spu69.online'],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "x-device-id"] // 👈 อนุญาต Device ID header
}));

app.options("*", cors());

const getDeviceKey = (c: any): string =>
  c.req.header('x-device-id') ??
  c.req.header('cf-connecting-ip') ??
  c.req.header('x-forwarded-for') ??
  'unknown';

app.use('*', rateLimiter({
  windowMs: 60 * 1000,
  limit: 500,
  keyGenerator: getDeviceKey,
  message: { success: false, message: 'ส่งคำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
  skip: (c) => c.req.header('x-bypass-limit') === 'true'
}));

// จำกัด: POST Qafrom 20 ครั้ง/นาที ต่อ Device
app.use('*/Qafrom', rateLimiter({
  windowMs: 60 * 1000,
  limit: 20,
  keyGenerator: getDeviceKey,
  message: { success: false, message: 'ส่งฟอร์มมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
  skip: (c) => c.req.header('x-bypass-limit') === 'true'
}));

// จำกัด: ส่งโพสต์ IG (มีรูปภาพ + Sharp + R2 upload) 3 ครั้ง/นาที ต่อ Device
// แยกต่อคน ไม่ติด NAT แล้ว
app.use('*/ig_my/insert-ig', rateLimiter({
  windowMs: 60 * 1000,
  limit: 3,
  keyGenerator: getDeviceKey,
  message: { success: false, message: 'ส่งรูปมากเกินไป กรุณารอ 1 นาทีแล้วลองใหม่' },
  skip: (c) => c.req.header('x-bypass-limit') === 'true'
}));

app.get('/', (c) => c.json({ message: 'API is running' }));

app.route('/Qafrom', qaRoutes);
app.route('/ig_my', igMyRoutes);
app.route('/popcar', popcatRoutes);
app.route('/apinext', controlRoutes);

const port = Number(process.env.PORT) || 5000;
serve({ fetch: app.fetch, port });