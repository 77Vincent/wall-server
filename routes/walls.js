const Router = require('koa-router')
const { ObjectID } = require('mongodb')

const { connect, pick } = require('../services')

const walls = Router()

const wallInterface = pick({
  name: '',
  author: '',
})

walls.get('/', async (ctx) => {
  try {
    const client = await connect()
    const data = await client.db().collection('wall').find().toArray()

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
    const data = await client.db().collection('wall').insertOne(wallInterface(ctx.request.body))

    ctx.status = 201
    ctx.body = data
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

walls.post('/:id', async (ctx) => {
  try {
    const client = await connect()

    const res = await client.db().collection('wall').updateOne({
      _id: ObjectID(ctx.params.id),
    }, {
      $set: wallInterface(ctx.request.body),
    })
    ctx.status = 200
    ctx.body = res
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

walls.delete('/:id', async (ctx) => {
  try {
    const client = await connect()
    const res = await client.db().collection('wall').deleteOne({
      _id: ObjectID(ctx.params.id),
    })

    ctx.status = 200
    ctx.body = res
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { walls }
