const models = require('../models')
const User = models.User

function fetchUsers(email, username) {
  return User.findAll({
    where: {
      $or: [
        { email: email },
        { username: username }
      ]
    }
  })
}

module.exports = (router) => {
  router.post('/users', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let resData = {}

    fetchUsers(email, username).then((users) => {
      if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == username)
            resData.username = 'This username has been registered'
          if (users[i].email == email)
            resData.email = 'This email has been registered'
        }
      }
      if (resData.email || resData.username) {
        resData.status = 'ERROR'
        res.json(resData)
      } else {
        User.create({
          username: username,
          email: email,
          searchChance: 0
        })
        .then(() => {
          res.json({ status: 'OK' })
        })
      }
    })
  })

  router.get('/users', (req, res) => {
    User.findAll().then((data) => {
      res.json(data)
    })
  })

  router.get('/users/:username', (req, res) => {
    let username = req.params.username
    User.findOne({
      where: {
        username: username
      }
    }).then((user) => {
      res.json(user)
    })
  })
}
