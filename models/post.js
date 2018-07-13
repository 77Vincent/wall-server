const Sequelize = require('sequelize')
const database = require('../services/database')

module.exports = database.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
  },
  positionX: {
    type: Sequelize.DOUBLE,
  },
  positionY: {
    type: Sequelize.DOUBLE,
  },
  isHidden: {
    type: Sequelize.BOOLEAN,
  },
  dislike: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})
