const database = require('../services/database')

before(async () => {
  await database.dropAllSchemas()
  await database.sync({ force: true })
})

const { Post } = require('../models')
const { Wall } = require('../models')

describe('Wall', () => {
  it('Create = 201', async () => {
    Wall.create({ name: '一号墙' })
  })
})

describe('Post', () => {
  it('Create = 201', async () => {
    Post.create({
      content: 'Welcome to the wall!',
      wallId: 1,
    })
  })
})
