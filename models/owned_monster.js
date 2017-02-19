module.exports = (sequelize, DataTypes) => {
  const OwnedMonster = sequelize.define('OwnedMonster', {
    name: DataTypes.STRING,
    statusPoint: DataTypes.INTEGER,
    addedAtk: DataTypes.INTEGER,
    addedDef: DataTypes.INTEGER,
    addedLuk: DataTypes.INTEGER,
    exp: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        OwnedMonster.belongsTo(models.User)
        OwnedMonster.belongsTo(models.Monster)
      }
    }
  })
  return OwnedMonster
}
