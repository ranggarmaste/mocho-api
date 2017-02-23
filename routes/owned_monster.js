const models = require('../models')
const User = models.User
const OwnedMonster = models.OwnedMonster

function createUpdatedFields(body) {
  let updatedFields = {}
  let fields = ['addedAtk', 'addedDef', 'addedRec', 'addedHP', 'addedSP', 'exp', 'hunger']
  for (let i = 0; i < fields.length; i++) {
    if (req.body[fields[i]]) {
      updatedFields[fields[i]] = req.body[fields[i]]
    }
  }
  return updatedFields
}

module.exports = (router) => {
  router.get('/users/:username/monsters', (req, res) => {
    let username = req.params.username
    User.findOne({
      include: [models.OwnedMonster],
      where: {
        username: username
      }
    }).then((user) => {
      res.json(user)
    })
  })

  router.put('/users/:username/monsters/:id', (req, res) => {
    let username = req.params.username
    let id = req.params.id
    let updatedFields = createUpdatedFields(req.body)
    OwnedMonster.findById(id).then((ownedMonster) => {
      ownedMonster.update(updatedFields).then(() => {
        res.json({ status: 'OK' })
      })
    })
  })
}
