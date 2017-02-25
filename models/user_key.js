module.exports = (sequelize, DataTypes) => {
  const UserKey = sequelize.define('UserKey', {
    username: DataTypes.STRING,
    deviceKey: DataTypes.STRING
  })
  return UserKey
}
