const models = require('../models')
const User = models.User
const Monster = models.Monster
const OwnedMonster = models.OwnedMonster
const Food = models.Food
const OwnedFood = models.OwnedFood

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
      include: [
        {
          model: OwnedMonster,
          include: [Monster]
        }
      ],
      where: { username: username }
    }).then((user) => {
      res.json(user)
    })
  })

  router.post('/users/:username/monsters/:monsterId/food', (req, res) => {
    let username = req.params.username
    let monsterId = parseInt(req.params.monsterId)
    let rice = parseInt(req.body.rice)
    let meat = parseInt(req.body.meat)
    let hunger = parseInt(req.body.hunger)

    User.findOne({
      include: [OwnedFood],
      where: { username: username }
    }).then((user) => {
      ownedFoods = user.OwnedFoods
      for (let i = 0; i < ownedFoods.length; i++) {
        if (ownedFoods[i].FoodId === 1) {
          ownedFoods[i].quantity = meat;
        } else if (ownedFoods[i].FoodId === 2) {
          ownedFoods[i].quantity = rice;
        }
        ownedFoods[i].save();
      }
      OwnedMonster.findById(monsterId).then((ownedMonster) => {
        ownedMonster.hunger = hunger;
        ownedMonster.save().then(() => {
          res.json({ status: 'OK' })
        })
      })
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
      ownedMonster.exp += 50;
      ownedMonster.hunger -= 10;
      ownedMonster.save().then(() => {
        res.json({ status: 'OK'})
      })
    })
  })
}
