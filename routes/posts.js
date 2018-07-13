const Router = require('koa-router')

const { Post } = require('../models')

const posts = Router()

posts.get('/', async (ctx) => {
  try {
    const data = await Post.findAll({})

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    ctx.throw(err)
  }
})

posts.put('/', async (ctx) => {
  try {
    const data = await Post.create(ctx.request.body)

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { posts }
