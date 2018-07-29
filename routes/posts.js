const Router = require('koa-router')
const querystring = require('querystring')
const { ObjectID } = require('mongodb')

const { connect, pick, shuffle } = require('../services')

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
  fontWeight: 300,
})

const limit = 200

posts.get('/', async (ctx) => {
  try {
    const client = await connect()
    let { page, isShuffle } = querystring.parse(ctx.request.querystring)

    page = page || 1
    isShuffle = isShuffle || false

    const data = await client.db()
      .collection('post')
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .toArray()

    const output = isShuffle
      ? data.slice(0, 2).concat(shuffle(data.slice(2, data.length)))
      : data

    ctx.body = output
    ctx.status = 200
    client.close()
  } catch (err) {
    ctx.throw(err)
  }
})

posts.put('/', async (ctx) => {
  try {
    const client = await connect()
    const payload = Object.assign({
      like: 0,
      dislike: 0,
    }, postInterface(ctx.request.body))

    const data = await client.db().collection('post').insertOne(payload)

    ctx.status = 201
    ctx.body = data.ops[0]
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
