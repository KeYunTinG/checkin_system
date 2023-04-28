'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Checks', [{
      working_day: '20230406',
      absence: false,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      working_day: '20230407',
      absence: false,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      working_day: '20230408',
      absence: true,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }], {})
  },
  down: async (queryInterface, Sequelize) => { // 清空資料表中所有資料
    await queryInterface.bulkDelete('Checks', {})
  }
};
