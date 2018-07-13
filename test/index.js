const database = require('../services/database')

before(async () => {
  await database.dropAllSchemas()
  await database.sync({ force: true })
})

require('./posts')
