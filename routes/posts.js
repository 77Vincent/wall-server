const Router = require('koa-router')
const { ObjectID } = require('mongodb')

const { connect, pick } = require('../services')

const posts = Router()

const postInterface = pick({
  content: '',
  wallID: '',
  isHidden: true,
  like: 0,
  dislike: 0,
  positionX: 0,
  positionY: 0,
  fontSize: 0,
  opacity: 0,
  color: '',
  fontWeight: 0,
})

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
    const data = await client.db().collection('post').insertOne(postInterface(ctx.request.body))

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
      $set: postInterface(ctx.request.body),
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
    const res = await client.db().collection('post').deleteOne({
      _id: ObjectID(ctx.params.id),
    })

    ctx.status = 200
    ctx.body = res
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { posts }
