const Sequelize = require('sequelize')

const sequelize = new Sequelize('mocho', 'mocho', 'mocho', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  searchChances: { type: Sequelize.INTEGER }
}, {
  freezeTableName: true
})

const Monster = sequilize.define('monster', {
  name: { type: Sequelize.STRING },
  
  atk: { type: Sequelize.INTEGER },
  def: { type: Sequelize.INTEGER },
  luk: { type: Sequelize.INTEGER }
})
User.sync({force: true})
