const Sequelize = require('sequelize')
const config = require('../config')

module.exports = new Sequelize(config.DATABASE_NAME, config.DATABASE_USER, config.DATABASE_PASSWORD, {
  host: config.host,
  dialect: config.DATABASE,
  port: config.DATABASE_PORT,
  timezone: config.TIMEZONE,
  define: {
    freezeTableName: true,
    collate: 'utf8_general_ci',
    charset: 'utf8',
  },
  dialectOptions: {
    ssl: false,
  },
})
