const Router = require('koa-router')

const { connect } = require('../services')

const walls = Router()

walls.get('/', async (ctx) => {
  try {
    const client = await connect()
    const collection = client.db().collection('Wall')
    const data = await collection.find().toArray()

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    ctx.throw(err)
  }
})

// walls.put('/', async (ctx) => {
//   try {

//     ctx.status = 201
//     ctx.body = data
//   } catch (err) {
//     ctx.throw(err)
//   }
// })

// walls.delete('/:id', async (ctx) => {
//   try {

//     ctx.status = 200
//   } catch (err) {
//     ctx.throw(err)
//   }
// })

module.exports = { walls }
