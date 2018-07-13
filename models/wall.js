const Sequelize = require('sequelize')
const database = require('../services/database')

module.exports = database.define('wall', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
})
