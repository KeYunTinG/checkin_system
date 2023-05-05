'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Checks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      working_day: {
        type: Sequelize.STRING
      },
      on_line: {
        type: Sequelize.STRING
      },
      off_line: {
        type: Sequelize.STRING
      },
      work_time: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      absence: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Checks');
  }
};