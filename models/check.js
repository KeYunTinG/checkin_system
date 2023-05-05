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
    onLine: DataTypes.STRING,
    offLine: DataTypes.STRING,
    workTime: DataTypes.INTEGER,
    status: DataTypes.STRING,
    absence: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Check',
    tableName: 'Checks',
    underscored: true
  })
  return Check;
};