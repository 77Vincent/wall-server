// All server configurations are stored here
const env = process.env.NODE_ENV

const base = {
  // http
  PROTOCOL: 'http',
  DB_PWD: 'Dalenavo77',
  PORT: 4001,
}

const development = {
  DB_URL: 'mongodb://localhost:27017/wall',
}
const production = {
  DB_URL: `mongodb+srv://vincent:${base.DB_PWD}@cluster0-3zrd8.mongodb.net/test?retryWrites=true`,
}

if (env === 'production') {
  Object.assign(base, production)
} else {
  Object.assign(base, development)
}

module.exports = base
