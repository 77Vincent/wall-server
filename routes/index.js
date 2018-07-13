const Router = require('koa-router')

const { posts } = require('./posts')

const router = Router({ prefix: '/api/' })

router.use('posts', posts.routes())

module.exports = router
