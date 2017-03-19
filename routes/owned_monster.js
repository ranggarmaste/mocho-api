const models = require('../models')
const User = models.User
const OwnedMonster = models.OwnedMonster

function createUpdatedFields(body) {
  let updatedFields = {}
  let fields = ['addedAtk', 'addedDef', 'addedRec', 'addedHP', 'addedSP', 'exp', 'hunger', 'subtype']
  for (let i = 0; i < fields.length; i++) {
    if (body[fields[i]]) {
      updatedFields[fields[i]] = body[fields[i]]
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

  router.get('/users/:username/monsters/:id/exp', (req, res) => {
    let username = req.params.username
    let id = req.params.id
    OwnedMonster.findById(id).then((ownedMonster) => {
      ownedMonster.exp += 100;
      ownedMonster.save().then(() => {
        res.json({ status: 'OK'})
      })
    })
  })
}
