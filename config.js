// All server configurations are stored here
const env = process.env.NODE_ENV

const development = {
  HOST: 'localhost',
}
const production = {
  HOST: 'www.xfolio.cn',
}

const base = {
  // http
  PROTOCOL: 'http',
  PORT: 4001,

  // Database basic config
  DB_URL: 'mongodb://localhost:27017/wall',
}

if (env === 'production') {
  Object.assign(base, production)
} else {
  Object.assign(base, development)
}

module.exports = base
