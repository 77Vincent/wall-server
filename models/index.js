const Post = require('./post')
const Wall = require('./wall')

Post.belongsTo(Wall)

module.exports = {
  Post,
  Wall,
}
