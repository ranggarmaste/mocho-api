module.exports = (sequelize, DataTypes) => {
  const OwnedMonster = sequelize.define('OwnedMonster', {
    name: DataTypes.STRING,
    // Added status
    addedAtk: DataTypes.INTEGER,
    addedDef: DataTypes.INTEGER,
    addedRec: DataTypes.INTEGER,
    addedHP: DataTypes.INTEGER,
    addedSP: DataTypes.INTEGER,
    exp: DataTypes.INTEGER,
    hunger: DataTypes.INTEGER,
    subtype: DataTypes.INTEGER
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
