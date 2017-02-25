module.exports = (sequelize, DataTypes) => {
  const OwnedFood = sequelize.define('OwnedFood', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        OwnedFood.belongsTo(models.User)
        OwnedFood.belongsTo(models.Food)
      }
    }
  })
  return OwnedFood
}
