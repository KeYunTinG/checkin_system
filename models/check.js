'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Check extends Model {
    static associate(models) {
      Check.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  };
  Check.init({
    workingDay: DataTypes.INTEGER,
    startWork: DataTypes.DATE,
    getOff: DataTypes.DATE,
    absence: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Check',
    tableName: 'Checks',
    underscored: true
  })
  return Check;
};