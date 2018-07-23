const request = require('request-promise-native')
const { connect } = require('../services')

const { HOST_URL } = require('../config')

before(async () => {
  const client = await connect()
  await client.db().collection('wall').deleteMany({})
})

describe('Wall', () => {
  it('Create = 201', async () => {
    await request({
      method: 'PUT',
      url: `${HOST_URL}walls`,
      body: {
        name: 'Wall 1',
        author: '77',
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}walls`,
      body: {
        name: 'Wall 1',
        author: '77',
      },
      json: true,
    })
  })

  it('Update = 200', async () => {
    const res = await request(`${HOST_URL}walls`)
    await request({
      method: 'POST',
      url: `${HOST_URL}walls/${JSON.parse(res)[0]._id}`,
      body: {
        name: 'This data has been modified for testing!',
      },
      json: true,
    })
  })

  it('Delete = 200', async () => {
    const res = await request(`${HOST_URL}walls`)
    await request({
      method: 'DELETE',
      url: `${HOST_URL}walls/${JSON.parse(res)[1]._id}`,
    })
  })
})
