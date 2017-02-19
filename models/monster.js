module.exports = (sequelize, DataTypes) => {
  const Monster = sequelize.define('Monster', {
    defaultName: DataTypes.STRING,
    type: DataTypes.STRING,
    atk: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    luk: DataTypes.INTEGER,
    hp: DataTypes.INTEGER
  })
  return Monster
}
