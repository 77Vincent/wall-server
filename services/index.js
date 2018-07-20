const { MongoClient } = require('mongodb')

const config = require('../config')

const typeCheck = input => Object.prototype.toString.call(input)

const is = (type, input) => typeCheck(type) === typeCheck(input)

const connect = async () => {
  try {
    const client = await MongoClient.connect(config.DB_URL)
    return client
  } catch (error) {
    console.error(error)
    return null
  }
}

module.exports = {
  connect,
  is,
}
