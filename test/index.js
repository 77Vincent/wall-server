const request = require('request-promise-native')
const { connect } = require('../services')

const url = 'http://localhost:4001/api/posts'

before(async () => {
  const client = await connect()
  await client.db().collection('post').deleteMany({})
})

describe('Post', () => {
  it('Create = 201', async () => {
    await request({
      method: 'PUT',
      url,
      body: {
        content: 'Welcome to the wall!',
        wallID: '1',
        positionX: 500,
        positionY: 500,
        opacity: 0.5,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url,
      body: {
        content: 'This is the great free wall',
        wallID: '1',
        positionX: 700,
        positionY: 700,
        opacity: 1,
      },
      json: true,
    })
  })

  it('Update = 200', async () => {
    const res = await request(url)
    await request({
      method: 'POST',
      url: `${url}/${JSON.parse(res)[0]._id}`,
      body: {
        content: 'This data has been modified for testing!',
      },
      json: true,
    })
  })

  it('Delete = 200', async () => {
    const res = await request(url)
    await request({
      method: 'DELETE',
      url: `${url}/${JSON.parse(res)[1]._id}`,
    })
  })
})
