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
  DATABASE: 'mysql',
  DATABASE_NAME: 'wall',
  DATABASE_USER: 'root',
  TIMEZONE: '+8:00',
  DATABASE_PASSWORD: '$Xf0li0Xf0li0',
  DATABASE_PORT: 3306,
  LIMIT: 100,
}

if (env === 'production') {
  Object.assign(base, production)
} else {
  Object.assign(base, development)
}

module.exports = base
