const Router = require('koa-router')
const { ObjectID } = require('mongodb')

const { connect } = require('../services')

const posts = Router()

posts.get('/', async (ctx) => {
  try {
    const client = await connect()
    const data = await client.db().collection('post').find().toArray()

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
    const {
      content,
      isHidden,
      like,
      dislike,
      positionX,
      positionY,
      fontSize,
      color,
      fontWeight,
    } = ctx.request.body
    const data = await client.db().collection('post').insertOne({
      content,
      isHidden,
      like,
      dislike,
      positionX,
      positionY,
      fontSize,
      color,
      fontWeight,
    })

    ctx.status = 201
    ctx.body = data
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

posts.post('/:id', async (ctx) => {
  try {
    const client = await connect()

    const res = await client.db().collection('post').updateOne({
      _id: ObjectID(ctx.params.id),
    }, {
      $set: ctx.request.body,
    })
    ctx.status = 200
    ctx.body = res
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
