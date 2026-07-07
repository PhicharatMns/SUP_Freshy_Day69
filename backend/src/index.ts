import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { connectDB } from './config/database.js';
import { cors } from 'hono/cors';

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

app.get('/', (c) => c.json({ message: 'API is running' }));

app.route('/Qafrom', qaRoutes);
app.route('/ig_my', igMyRoutes);
app.route('/popcar', popcatRoutes);
app.route('/apinext', controlRoutes);

const port = Number(process.env.PORT) || 5000;
serve({ fetch: app.fetch, port });