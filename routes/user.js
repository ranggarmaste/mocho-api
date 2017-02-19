const models = require('../models')

module.exports = (router) => {
  router.post('/users', (req, res) => {
    models.User.create()
  })

  router.get('/users', (req, res) => {
    console.log('GET: Hello, World!')
    res.send('GET: Hello, World!')
  })
}
