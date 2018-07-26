const Router = require('koa-router')
const querystring = require('querystring')
const { ObjectID } = require('mongodb')

const { connect, pick } = require('../services')

const posts = Router()

const postInterface = pick({
  content: '',
  isHidden: false,
  like: 0,
  dislike: 0,
  fontSize: 16,
  isItalic: true,
  opacity: 1,
  color: '#000',
  fontWeight: 500,
})
const filter = pick({
  wallID: '',
})

posts.get('/', async (ctx) => {
  try {
    const client = await connect()
    const data = await client.db()
      .collection('post')
      .find(filter(querystring.parse(ctx.request.querystring)))
      .toArray()

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
