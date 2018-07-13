const Koa = require('koa')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')

const config = require('./config')
const routes = require('./routes')

const app = new Koa()
app.proxy = true
app.use(convert(logger()))
app.use(convert(cors()))
app.use(convert(bodyParser({ jsonLimit: '10mb' })))

app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})

app.use(routes.routes(), routes.allowedMethods())

app.on('error', (error) => {
  throw new Error(`Server Internal Error:${error}`)
})

app.listen(config.PORT)
