const models = require('../models')
const User = models.User
const OwnedFood = models.OwnedFood
const Food = models.Food

module.exports = (router) => {
  router.get('/users/:username/foods', (req, res) => {
    let username = req.params.username
    User.findOne({
      include: [
        {
          model: OwnedFood,
          include: [Food]
        }
      ],
      where: { username: username }
    }).then((user) => {
      res.json(user)
    })
  })
}
