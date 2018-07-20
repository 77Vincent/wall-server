const Router = require('koa-router')

const { posts } = require('./posts')
// const { walls } = require('./walls')

const router = Router({ prefix: '/api/' })

router.use('posts', posts.routes())
// router.use('walls', walls.routes())

module.exports = router
