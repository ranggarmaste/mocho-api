module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    searchChance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.OwnedMonster)
        User.hasMany(models.OwnedFood)
      }
    }
  })
  return User
}
