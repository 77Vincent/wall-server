const request = require('request-promise-native')

const url = 'http://localhost:4001/api/posts'

describe('Post', () => {
  it('Create = 201', async () => {
    await request({
      method: 'PUT',
      url,
      body: {
        content: 'Welcome to the wall!',
        wallId: 1,
        positionX: 500,
        positionY: 500,
      },
      json: true,
    })
  })

  it('Update = 200', async () => {
    await request({
      method: 'POST',
      url: `${url}/5b51b37e6f03a42ea0414ba0`,
      body: { isHidden: true },
      json: true,
    })
  })
})
