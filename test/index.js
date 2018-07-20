const { connect } = require('../services')

describe('Post', () => {
  it('Create = 201', async () => {
    const client = await connect()
    const collection = client.db().collection('post')
    await collection.insert([{
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
