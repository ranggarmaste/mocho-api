const fs = require('fs')
const path = require('path')
const readline = require('readline')

const models = require('../models')
const User = models.User
const OwnedMonster = models.OwnedMonster
const Monster = models.Monster
const Food = models.Food
const OwnedFood = models.OwnedFood

module.exports = (router) => {
  router.get('/seed/user', (req, res) => {
    User.create({
      email: 'ranggarmaste@gmail.com',
      username: 'ranggarmaste',
      searchChance: 0
    })
  })
  
  router.get('/seed/:filename', (req, res) => {
    let filename = req.params.filename + ".txt"
    importFromFile(filename)
    res.json({status: 'OK'})
  })
}

function importFromFile(filename) {
  let rd = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '../seed/' + filename)),
    output: process.stdout,
    console: false
  })
  let firstLine = true
  rd.on('line', (line) => {
    if (firstLine) { // skip firstLine
      firstLine = false;
    } else {
      fields = line.split(" ")
      if (filename == "monsters.txt") {
        createMonster(fields)
      } else if (filename == "owned_monsters.txt") {
        createOwnedMonster(fields)
      } else if (filename == "foods.txt") {
        createFood(fields)
      } else { // owned_foods.txt
        createOwnedFood(fields)
      }
    }
  })
}

function createMonster(fields) {
  Monster.create({
    defaultName: fields[0],
    type: fields[1],
    initAtk: fields[2],
    initDef: fields[3],
    initRec: fields[4],
    initHP: fields[5],
    initSP: fields[6],
    incrAtk: fields[7],
    incrDef: fields[8],
    incrRec: fields[9],
    incrHP: fields[10],
    incrSP: fields[11],
  }).then(() => {
    console.log('Successfully added.')
  })
}

function createOwnedMonster(fields) {
  User.findOne({
    where: {
      username: 'ranggarmaste'
    }
  }).then((user) => {
    let ownedMonster = OwnedMonster.build({
      name: fields[0],
      addedAtk: fields[1],
      addedDef: fields[2],
      addedRec: fields[3],
      addedHP: fields[4],
      addedSP: fields[5],
      exp: fields[6],
      hunger: fields[7],
    })
    ownedMonster.setUser(user)
    ownedMonster.save().then(() => {
      console.log('Hore')
    })
  })
}

function createFood(fields) {
  let food = Food.build({
    name: fields[0],
    type: fields[1],
    amount: parseInt(fields[2])
  })
  food.save().then(() => {
    console.log('Hore')
  })
}

function createOwnedFood(fields) {
  User.findOne({
    where: {
      username: 'ranggarmaste'
    }
  }).then((user) => {
    let ownedFood = OwnedFood.build({
      name: fields[0],
      quantity: parseInt(fields[1])
    })
    ownedFood.setUser(user)
    ownedFood.save().then(() => {
      console.log('Hore')
    })
  })
}
