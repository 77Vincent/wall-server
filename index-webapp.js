const Koa = require('koa')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const proxy = require('koa-proxy')

const app = new Koa()
app.proxy = true

app.use(convert(bodyParser({ jsonLimit: '10mb' })))

app.use(serve('../wall-webapp/build'))

app.use(proxy({
  host: 'http://localhost:4001/',
}))

app.listen(3000)
