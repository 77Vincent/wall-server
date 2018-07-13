const Router = require('koa-router')

const { Wall } = require('../models')

const walls = Router()

walls.get('/', async (ctx) => {
  try {
    const data = await Wall.findAll({})

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    ctx.throw(err)
  }
})

walls.put('/', async (ctx) => {
  try {
    const data = await Wall.create(ctx.request.body)

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    ctx.throw(err)
  }
})

walls.delete('/:id', async (ctx) => {
  try {
    Wall.destroy({
      where: { id: ctx.params.id },
    })

    ctx.status = 200
  } catch (err) {
    ctx.throw(err)
  }
})

module.exports = { walls }
