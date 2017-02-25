module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER
  })
  return Food
}
