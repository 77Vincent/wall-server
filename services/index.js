const { MongoClient } = require('mongodb')

const config = require('../config')

const typeCheck = input => Object.prototype.toString.call(input)

const is = (type, input) => typeCheck(type) === typeCheck(input)

const pick = (blueprint = {}) => (input) => {
  const output = {}
  Object.keys(input).map((key) => {
    if (Object.prototype.hasOwnProperty.call(blueprint, key)) {
      if (blueprint[key] === null || blueprint[key] === undefined) {
        output[key] = input[key]
      } else if (is(blueprint[key], input[key])) {
        if (input[key] === null || input[key] === undefined) {
          output[key] = blueprint[key]
        } else {
          output[key] = input[key]
        }
      }
    }
    return false
  })
  return output
}

const shuffle = (array) => {
  const output = array
  let currentIndex = array.length
  let temporaryValue = null
  let randomIndex = null

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = output[currentIndex]
    output[currentIndex] = output[randomIndex]
    output[randomIndex] = temporaryValue
  }

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
  shuffle,
  pick,
}
