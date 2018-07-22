const { MongoClient } = require('mongodb')

const config = require('../config')

const typeCheck = input => Object.prototype.toString.call(input)

const is = (type, input) => typeCheck(type) === typeCheck(input)

const Interface = (blueprint = {}) => (input) => {
  const output = {}
  Object.keys(input).map((key) => {
    if (Object.prototype.hasOwnProperty.call(blueprint, key)) {
      if (blueprint[key] === null || blueprint[key] === undefined) {
        output[key] = input[key]
      } else if (is(blueprint[key], input[key])) {
        output[key] = input[key]
      }
    }
    return false
  })
  return output
}

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
  Interface,
}
