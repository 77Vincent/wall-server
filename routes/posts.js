const Router = require('koa-router')
const seq = require('sequelize-easy-query')

const { Post } = require('../models')

const posts = Router()

posts.get('/', async (ctx) => {
  try {
    const data = await Post.findAll({
      where: seq(ctx.request.querystring, {
        filterBy: ['wallId'],
      }),
    })

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

posts.delete('/:id', async (ctx) => {
  try {
    Post.destroy({
      where: { id: ctx.params.id },
    })

    ctx.status = 200
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { posts }
