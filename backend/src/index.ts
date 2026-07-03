import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { connectDB } from './DB/DB.js'
import { cors } from 'hono/cors'
import Qa from './router/Qa.js'
import ig_my from './router/Ig_my.js'
import popcar from './router/popcat.js'


const app = new Hono()

await connectDB()

app.use('/*', cors({
  origin: 'http://localhost:3000', // URL ของฝั่ง Front-end
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.options("*", cors());

app.route('/Qafrom', Qa)
app.route('/ig_my', ig_my)
app.route('/popcar', popcar)

const port = Number(process.env.PORT) || 5000
serve({ fetch: app.fetch, port })
