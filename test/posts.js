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
        opacity: 0.8,
        fontSize: 12,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: '欢迎来到涂鸦墙!',
        color: '#666',
        fontSize: 24,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: 'This is the great free wall, feel free to say anything!!',
        opacity: 1,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: '等等',
        isItalic: true,
        fontWeight: 700,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: '需要更多的测试数据，今天中午的大雨下得真突然!',
        color: '#456aaa',
        fontSize: 18,
        opacity: 0.75,
      },
      json: true,
    })

    await request({
      method: 'PUT',
      url: `${HOST_URL}posts`,
      body: {
        content: 'This Math Review will familiarize you with the mathematical skills and concepts that are important.',
        color: '#123456',
        fontSize: 27,
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

  // it('Delete = 200', async () => {
  //   const res = await request(`${HOST_URL}posts`)
  //   await request({
  //     method: 'DELETE',
  //     url: `${HOST_URL}posts/${JSON.parse(res)[1]._id}`,
  //   })
  // })
})
