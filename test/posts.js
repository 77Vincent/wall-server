const request = require('request-promise-native')
const { connect } = require('../services')

const { HOST_URL } = require('../config')

before(async () => {
  const client = await connect()
  await client.db().collection('post').deleteMany({})
})

describe('Post', () => {
  it('Create = 201', async () => {
    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: 'Welcome to the wall!',
        positionX: 500,
        positionY: 500,
        opacity: 0.5,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: 'This is the great free wall',
        positionX: 700,
        positionY: 700,
        opacity: 1,
      },
      json: true,
    })
  })

  it('Update = 200', async () => {
    const res = await request(`${HOST_URL}posts`)
    await request({
      method: 'POST',
      url: `${HOST_URL}posts/${JSON.parse(res)[0]._id}`,
      body: {
        content: 'This data has been modified for testing!',
      },
      json: true,
    })
  })

  it('Delete = 200', async () => {
    const res = await request(`${HOST_URL}posts`)
    await request({
      method: 'DELETE',
      url: `${HOST_URL}posts/${JSON.parse(res)[1]._id}`,
    })
  })
})
