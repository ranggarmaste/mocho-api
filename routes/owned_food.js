const models = require('../models')
const User = models.User
const OwnedFood = models.OwnedFood

module.exports = (router) => {
  router.get('/users/:username/foods', (req, res) => {
    let username = req.params.username
    User.findOne({
      include: [models.OwnedFood],
      where: {
        username: username
      }
    }).then((user) => {
      res.json(user)
    })
  })
}
