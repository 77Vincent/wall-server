const Sequelize = require('sequelize')
const database = require('../services/database')

module.exports = database.define('post', {
  id: {
    type: Sequelize.BIGINT,
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
  color: {
    type: Sequelize.STRING,
    defaultValue: '#000000',
  },
  wallId: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  fontSize: {
    type: Sequelize.TINYINT,
    defaultValue: 16,
  },
  fontWeight: {
    type: Sequelize.SMALLINT,
    defaultValue: 500,
  },
  opacity: {
    type: Sequelize.TINYINT,
    defaultValue: 100,
  },
  isItalic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  underline: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isHidden: {
    type: Sequelize.BOOLEAN,
  },
  dislike: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  like: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
})
