// All server configurations are stored here
const env = process.env.NODE_ENV

const base = {
  // http
  DB_PWD: 'Dalenavo77',
  PORT: 4001,
}

const development = {
  DB_URL: 'mongodb://localhost:27017/wall',
  HOST_URL: 'http://localhost:4001/api/',
}
const production = {
  DB_URL: `mongodb+srv://vincent:${base.DB_PWD}@cluster0-3zrd8.mongodb.net/test?retryWrites=true`,
  HOST_URL: 'http://localhost:4001/api/',
}

if (env === 'production') {
  Object.assign(base, production)
} else {
  Object.assign(base, development)
}

module.exports = base
