const { Post } = require('../models')

describe('Posts', () => {
  it('Create = 201', async () => {
    Post.create({
      content: 'Welcome to the wall!',
    })
  })
})
