const request = require('request-promise-native')
const { connect } = require('../services')

const { HOST_URL } = require('../config')

before(async () => {
  const client = await connect()
  await client.db().collection('post').deleteMany({})
})

const data = [
  'Welcome to the wall! Feel free to write something on it',
  '欢迎来到涂鸦墙！写下你想说的话',
]

describe('Post', () => {
  it('Create = 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      await request({
        method: 'PUT',
        url: `${HOST_URL}posts`,
        body: {
          content: data[i],
        },
        json: true,
      })
    }
  })

  // it('Delete = 200', async () => {
  //   const res = await request(`${HOST_URL}posts`)
  //   await request({
  //     method: 'DELETE',
  //     url: `${HOST_URL}posts/${JSON.parse(res)[1]._id}`,
  //   })
  // })
})
