const database = require('../services/database')

before(async () => {
  await database.dropAllSchemas()
  await database.sync({ force: true })
})

const { Post } = require('../models')
const { Wall } = require('../models')

describe('Wall', () => {
  it('Create = 201', async () => {
    await Wall.bulkCreate([
      { name: '一号墙' },
      { name: '二号墙' },
    ])
  })
})

describe('Post', () => {
  it('Create = 201', async () => {
    Post.bulkCreate([{
      content: 'Welcome to the wall!',
      wallId: 1,
      positionX: 500,
      positionY: 500,
    }, {
      content: '欢迎来到墙!',
      wallId: 2,
      positionX: 700,
      positionY: 700,
    }])
  })
})
