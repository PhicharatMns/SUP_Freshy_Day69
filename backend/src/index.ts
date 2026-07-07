import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { connectDB } from './DB/DB.js'
import { cors } from 'hono/cors'
import Qa from './router/Qa.js'
import ig_my from './router/Ig_my.js'
import popcar from './router/popcat.js'
import apinext from './router/api.js'




const app = new Hono()

await connectDB()

// app.use('/*', cors({
//   origin: 'http://147.50.254.93',
//   allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// }))

app.use('*', cors({
  origin: '*',
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}))

app.options("*", cors());

app.route('/Qafrom', Qa)
app.route('/ig_my', ig_my)
app.route('/popcar', popcar)
app.route('/apinext' , apinext)

const port = Number(process.env.PORT) || 5000
serve({ fetch: app.fetch, port })


// import 'dotenv/config'
// import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
// import { connectDB } from './DB/DB.js'
// import { cors } from 'hono/cors'
// import Qa from './router/Qa.js'
// import ig_my from './router/Ig_my.js'
// import popcar from './router/popcat.js'

// const app = new Hono()

// await connectDB()


// app.use('*', cors({
//   origin: '*',
//   allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowHeaders: ["Content-Type", "Authorization"]
// }))

// app.route('/Qafrom', Qa)
// app.route('/ig_my', ig_my)
// app.route('/popcar', popcar)

// const port = Number(process.env.PORT) || 5000
// serve({ fetch: app.fetch, port })