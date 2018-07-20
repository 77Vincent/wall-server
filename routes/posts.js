const Router = require('koa-router')

const { connect } = require('../services')

const posts = Router()

posts.get('/', async (ctx) => {
  try {
    const client = await connect()
    const collection = client.db().collection('post')
    const data = await collection.find().toArray()

    ctx.body = data
    ctx.status = 200
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

posts.put('/', async (ctx) => {
  try {
    const client = await connect()
    const collection = client.db().collection('post')
    const data = await collection.insertOne(ctx.request.body)

    ctx.status = 201
    ctx.body = data
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

posts.delete('/:id', async (ctx) => {
  try {
    const client = await connect()

    ctx.status = 200
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { posts }
