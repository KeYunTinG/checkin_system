'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Check extends Model {
    static associate(models) {
      Check.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  };
  Check.init({
    workingDay: DataTypes.STRING,
    onLine: DataTypes.DATE,
    offLine: DataTypes.DATE,
    absence: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Check',
    tableName: 'Checks',
    underscored: true
  })
  return Check;
};