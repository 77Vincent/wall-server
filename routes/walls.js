const Router = require('koa-router')

const { connect } = require('../services')

const walls = Router()

walls.get('/', async (ctx) => {
  try {
    const client = await connect()
    const collection = client.db().collection('wall')
    const data = await collection.find().toArray()

    ctx.body = data
    ctx.status = 200
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

walls.put('/', async (ctx) => {
  try {
    const client = await connect()
    const collection = client.db().collection('wall')
    const data = await collection.find().toArray()

    ctx.status = 201
    ctx.body = data
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { walls }
