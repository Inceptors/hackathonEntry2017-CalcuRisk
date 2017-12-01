const index = require('./index')
const category = require('./category')
const rating = require('./rating')
const add = require('./add')

module.exports = (app) => {

  app.use('/', index) //root route
  app.use('/category', category)
  app.use('/rating', rating)
  app.use('/add', add)
}
