module.exports = (sequelize, DataTypes) => {
  const Monster = sequelize.define('Monster', {
    defaultName: DataTypes.STRING,
    type: DataTypes.STRING,
    // Init status
    initAtk: DataTypes.INTEGER,
    initDef: DataTypes.INTEGER,
    initRec: DataTypes.INTEGER,
    initHP: DataTypes.INTEGER,
    initSP: DataTypes.INTEGER,
    // Incrm status
    incrAtk: DataTypes.INTEGER,
    incrDef: DataTypes.INTEGER,
    incrRec: DataTypes.INTEGER,
    incrHP: DataTypes.INTEGER,
    incrSP: DataTypes.INTEGER,
  })
  return Monster
}
